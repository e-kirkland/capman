# Standard library imports
import random as random
import os
from os.path import join, dirname
import datetime

# Third-party imports
import nfl_data_py as nfl
import pandas as pd
import numpy as np
import scipy.stats as st
from dotenv import load_dotenv

# Local Imports
from scripts import postgres_tools as pgt


def compile_offensive_points(
    passing_yards,
    passing_td,
    passing_2pt,
    interceptions,
    rushing_yards,
    rushing_td,
    rushing_2pt,
    sack_fumbles_lost,
    rushing_fumbles_lost,
    receptions,
    receiving_yards,
    receiving_td,
    receiving_2pt,
):
    total_points = 0
    total_points += passing_yards * 0.04
    total_points += passing_td * 6
    total_points += passing_2pt * 2
    total_points -= 2 * interceptions
    total_points += rushing_yards * 0.1
    total_points += rushing_td * 6
    total_points += rushing_2pt * 2
    total_points -= sack_fumbles_lost * 2
    total_points -= rushing_fumbles_lost * 2
    total_points += receptions
    total_points += receiving_yards * 0.1
    total_points += receiving_td * 6
    total_points += receiving_2pt * 2

    return total_points


def calculate_mean_std(df, position, years, k=12, start=0):
    try:
        pos_df = df[df["position"].isin(position)]
    except KeyError as e:
        print("KEY ERROR: ", position)
        print("KEY ERROR DF: ", df.head())
        print("KEY ERROR DF COLUMNS: ", df.columns)
        raise e

    avg_year = pos_df.groupby(["player_name", "season"])["total_points"].mean()
    avg_year = avg_year.reset_index()

    top_dfs = []
    for year in years:
        avg_df = avg_year[avg_year["season"] == year]
        top_k = avg_df.sort_values(by="total_points", ascending=False)[
            start : start + k
        ]
        top_dfs.append(top_k)

    top_combined = pd.concat(top_dfs)
    mean = top_combined["total_points"].mean()
    std = top_combined["total_points"].std()

    return mean, std


def monte_carlo_game(df, num_iterations):
    total_points = []
    for n in range(0, num_iterations):
        points_series = df.apply(
            lambda x: random.normalvariate(x["mean"], x["std"]), axis=1
        )
        total_points.append(points_series.sum())

    return total_points


def calculate_player_wins(
    sleeper_id, position, num_games, df, avg_df, avg_team_mean, avg_team_std
):
    player_points = df[df["sleeper_id"] == sleeper_id]["total_points"]
    player_points_avg = player_points.mean()

    score_without_position = avg_df[avg_df["position"] != position]["mean"].sum()
    score_with_player = score_without_position + player_points_avg

    player_z = (score_with_player - avg_team_mean) / avg_team_std

    player_win_prob = st.norm.cdf(player_z)
    player_wins = player_win_prob * num_games

    return player_wins


def calculate_avg_player_wins(position, num_games, avg_df, avg_team_mean, avg_team_std):
    player_points = avg_df[avg_df["position"] == position]["mean"].sum()

    score_without_position = avg_df[avg_df["position"] != position]["mean"].sum()
    score_with_player = score_without_position + player_points

    player_z = (score_with_player - avg_team_mean) / avg_team_std

    player_win_prob = st.norm.cdf(player_z)
    player_wins = player_win_prob * num_games

    return player_wins


def calculate_war(
    sleeper_id, position, num_games, df, avg_df, avg_team_mean, avg_team_std
):
    player_wins = calculate_player_wins(
        sleeper_id, position, num_games, df, avg_df, avg_team_mean, avg_team_std
    )
    avg_player_wins = calculate_avg_player_wins(
        position, num_games, avg_df, avg_team_mean, avg_team_std
    )

    return player_wins - avg_player_wins


def create_merged_player_df(years=[2021, 2020, 2019]):

    # Download roster values for years
    rosters = nfl.import_rosters(years)

    player_merge_table = pd.DataFrame(
        rosters.groupby(["player_name", "position", "player_id", "sleeper_id"])
        .size()
        .reset_index(name="Freq")
    )

    # Download yearly data from nfl_data_py
    yearly = nfl.import_weekly_data(years, downcast=True)

    yearly = yearly.drop(columns=["player_name"])
    yearly = yearly.merge(
        player_merge_table, how="left", left_on="player_id", right_on="player_id"
    )
    yearly = yearly.drop(columns=["Freq"])

    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    # Ingest data from sleeper league
    query = f"""SELECT player_id,
                       player,
                       team,
                       salary,
                       roster_id,
                       injured_reserve
                  FROM players;"""
    fantasy_players = pgt.df_from_postgres(query, db, "players")

    # fantasy_players = pd.read_csv(
    #     "/Users/williamkirkland/Data/KDS/capman/data/rosters_postdraft_rookies_20220619_1.csv"
    # )

    # fantasy_players = fantasy_players.dropna(subset=["player"])
    # fantasy_players = fantasy_players.drop(columns=["position"])

    # Merge data from sleeper league
    fantasy_players = fantasy_players.rename(
        columns={"player_id": "sleeper_id", "player": "sleeper_player_name"}
    )

    merged = yearly.merge(
        fantasy_players, how="left", left_on="sleeper_id", right_on="sleeper_id"
    )

    # Fixing position column, keeping current positions from postgres
    merged = merged.drop(columns=["position_x"]).rename(
        columns={"position_y": "position"}
    )

    # Getting single record for each sleeper_id and position
    player_single_record = pd.DataFrame(
        rosters.groupby(["sleeper_id", "position"]).size().reset_index(name="Freq")
    )
    print("PLAYER SINGLE RECORD INFO: ", player_single_record.info())

    return merged, player_single_record


def calculate_average_team(merged, years=[2021, 2020, 2019]):

    # Compile points for offensive players
    merged["total_points"] = merged.apply(
        lambda x: compile_offensive_points(
            x["passing_yards"],
            x["passing_tds"],
            x["passing_2pt_conversions"],
            x["interceptions"],
            x["rushing_yards"],
            x["rushing_tds"],
            x["rushing_2pt_conversions"],
            x["sack_fumbles_lost"],
            x["rushing_fumbles_lost"],
            x["receptions"],
            x["receiving_yards"],
            x["receiving_tds"],
            x["receiving_2pt_conversions"],
        ),
        axis=1,
    )

    # Remove 0s to correct for missed games
    merged["total_points"] = merged["total_points"].astype(float).replace(0.0, np.NaN)

    df_list = []

    qb_mean, qb_std = calculate_mean_std(merged, position=["QB"], years=years, k=32)
    df_list.append(["QB", qb_mean, qb_std, 10])

    rb_mean, rb_std = calculate_mean_std(merged, position=["RB"], years=years, k=64)
    df_list.append(["RB", rb_mean, rb_std, 10])

    rb2_mean, rb2_std = calculate_mean_std(merged, position=["RB"], years=years, k=64)
    df_list.append(["RB2", rb2_mean, rb2_std, 10])

    wr_mean, wr_std = calculate_mean_std(merged, position=["WR"], years=years, k=64)
    df_list.append(["WR", wr_mean, wr_std, 10])

    wr2_mean, wr2_std = calculate_mean_std(merged, position=["WR"], years=years, k=32)
    df_list.append(["WR2", wr2_mean, wr2_std, 10])

    te_mean, te_std = calculate_mean_std(merged, position=["TE"], years=years, k=32)
    df_list.append(["TE", te_mean, te_std, 10])

    avg_df = pd.DataFrame(df_list, columns=["position", "mean", "std", "n"])

    return avg_df


def simulate_avg_points(avg_df, n_iter=10000):

    # Calculate total points with simulation
    total_points = monte_carlo_game(avg_df, n_iter)
    # Calculate avg/stdev
    avg_team_mean = np.mean(total_points)
    avg_team_std = np.std(total_points)

    return avg_team_mean, avg_team_std


def calculate_all_players_war(merged, player_df, avg_df, avg_team_mean, avg_team_std):

    # Dropping existing war and value
    print("MERGED PRE WAR: ", merged.info())

    # Get dataframe to calculate war
    keepcols = ["sleeper_id", "position"]
    player_df = player_df[keepcols]
    positions_keep = ["QB", "RB", "WR", "TE"]
    player_df = player_df[player_df["position"].isin(positions_keep)]

    ###
    print("PLAYER DF INFO: ", player_df.info())

    # Calculate WAR for all players
    player_df["war"] = player_df.apply(
        lambda x: calculate_war(
            x["sleeper_id"],
            x["position"],
            15,
            merged,
            avg_df,
            avg_team_mean,
            avg_team_std,
        ),
        axis=1,
    )

    print("PLAYER DF INFO POST WAR: ", player_df.info())

    player_df = player_df.dropna(subset=["war", "sleeper_id"])
    player_df = player_df.sort_values(by=["war"], ascending=False)

    return player_df


def calculate_league_war(years=[2021, 2020, 2019]):

    merged, player_df = create_merged_player_df(years)

    avg_df = calculate_average_team(merged, years=years)

    avg_team_mean, avg_team_std = simulate_avg_points(avg_df, n_iter=10000)

    # Reducing player point calculations to previous 20 games
    merged = merged.sort_values(by=["season", "week"], ascending=False)
    merged["player_count"] = merged.groupby("sleeper_id")["sleeper_id"].transform(
        "count"
    )

    # Reducing to players with more than 3 games to consider
    merged = merged[merged["player_count"] >= 3]
    merged = merged.drop(columns=["player_count"])
    merged = merged.groupby("sleeper_id").head(20).reset_index(drop=True)

    player_df = calculate_all_players_war(
        merged, player_df, avg_df, avg_team_mean, avg_team_std
    )

    return player_df


def calculate_value(salary, war):
    if salary:
        if war:
            if salary == 0.0:
                return 0.0
            else:
                if war == 0.9:
                    return 0.0
                else:
                    return war / salary
        else:
            return 0.0
    else:
        return 0.0


def get_year_dates(num_years=3):

    cur_year = int(datetime.datetime.now().strftime("%Y"))
    all_years = []
    for n in range(0, num_years):
        all_years.append(cur_year - n)

    return all_years


def update_league_war():

    years = get_year_dates(num_years=1)
    print("YEARS TO ANALYZE: ", years)

    player_df = calculate_league_war(years)
    player_df = player_df.drop(columns=["position"])

    print("PLAYER_DF: ", player_df.head(20))
    print("PLAYER_DF_INFO: ", player_df.info())

    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)
    db_path = os.environ.get("POSTGRES_CONTAINER")
    print("CONNECTING TO POSTGRES AT: ", str(db_path))

    # Getting existing players table
    query = f"""SELECT * FROM players;"""
    fantasy_players = pgt.df_from_postgres(query, db, "players")
    fantasy_players = fantasy_players.drop(columns=["war", "value"])

    # Merging
    merged = fantasy_players.merge(
        player_df, how="left", left_on="player_id", right_on="sleeper_id"
    )

    print("MERGED DF: ", merged.head(20))
    print("MERGED DF COLUMNS: ", merged.columns)
    print("MERGED DF INFO: ", merged.info())

    # Calculating value
    merged["salary"] = pd.to_numeric(merged["salary"])
    merged["value"] = merged.apply(
        lambda x: calculate_value(x["salary"], x["war"]), axis=1
    )

    keepcols = [
        "player_id",
        "player",
        "position",
        "team",
        "salary",
        "roster_id",
        "injured_reserve",
        "war",
        "value",
    ]
    current_players = merged[keepcols]

    # Accessing table in posgres db
    options = pgt.postgres_connect(db_path, db)
    cursor = options[1]
    engine = options[0]
    conn = engine.raw_connection()

    print("CURRENT PLAYERS: ", current_players.head(20))

    for n in range(0, len(current_players)):
        player_id = current_players["player_id"][n]
        war = current_players["war"][n]
        value = current_players["value"][n]

        if war != np.NaN and value != np.NaN:
            war = "{:.2f}".format(war)
            value = "{:.3f}".format(value)
            query = f"""
                UPDATE players
                SET war='{war}',
                    value='{value}'
                WHERE player_id='{str(player_id)}'
                """
        else:
            pass
        # Update players one by one
        cursor.execute(query)

    # Close communication
    cursor.close()
    # Commit changes
    conn.commit()

    return "SUCCESS"


if __name__ == "__main__":

    player_df = calculate_league_war(years=[2021, 2020, 2019])
    print(player_df.head(100))

