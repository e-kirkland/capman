# Standard library imports
from ast import literal_eval
import json
import os, sys
from os.path import join, dirname
from typing_extensions import ParamSpecArgs
from pathlib import Path

# Third-party imports
import pandas as pd
import checkpointe as check
import datetime as dt
from sleeper_wrapper import League, Players
from dotenv import load_dotenv

# Local imports
from scripts import postgres_tools as pgt


def get_players():
    try:
        # Get all player data
        players = Players()
        all_players = players.get_all_players()

        # Convert json to dataframe
        playerdf = pd.DataFrame.from_dict(all_players, orient="index")

        # Format playerdf for postgres upload
        playerdf["player"] = playerdf["full_name"]
        keepcols = ["player_id", "player", "position", "team"]
        playerdf = playerdf[keepcols]

        # Limiting to only fantasy-relevant players
        offensepos = ["WR", "RB", "TE", "QB", "K", "DEF"]
        playerdf = playerdf[playerdf["position"].isin(offensepos)]

        # Storing placeholders for salary
        playerdf["salary"] = 0

        return playerdf

    except Exception as e:
        return print(e)


def setup_league(leagueID):
    try:

        # Pulling players roster
        playerdf = get_players()

        print(playerdf.head())

        # Get all roster data
        teams = get_teams(leagueID)

        print("TEAMS: ", teams.head())

        # Matching players to rosters based on current teams
        playerdf["roster_id"] = playerdf["player_id"].apply(
            lambda x: match_player_to_roster(x, teams)
        )

        # Getting database name
        parent_path = dirname(__file__)
        dotenv_path = join(dirname(parent_path), ".env")

        print("PATH TO LOOKUP: ", dotenv_path)
        load_dotenv(dotenv_path)
        db = os.environ.get("POSTGRES_DB")

        # Storing player data to postgres
        pgt.df_to_postgres(playerdf, db, "players", method="replace")

        # Get current transactions
        transactions = get_transactions(leagueID)

        # Store most recent transaction
        transaction_id = get_most_recent_transaction(transactions)

        return transaction_id

    except Exception as e:
        return print(e)


def get_transactions(leagueID):
    try:

        # Instantiate league based on id
        league = League(leagueID)

        # Blank transactions value to start
        transactions = []

        # List of possible weeks
        weeklist = range(0, 18)
        print("WEEKLIST: ", weeklist)

        for n in weeklist:

            print(f"TRYING TRANSACTIONS FOR WEEK {n}")
            # Try to get transactions for week number
            week_transactions = league.get_transactions(n)
            if week_transactions:
                print("TRANSACTIONS RETRIEVED: ", len(week_transactions))
            transactions = week_transactions + transactions

        return transactions

    except Exception as e:

        return print(e)


def compile_team_data(users, rosters):

    try:

        # # Compile roster data
        rosterdf = pd.DataFrame(rosters)

        print("ROSTER DF LEN: ", len(rosterdf))

        # Narrowing to relevant fields
        keepcols = ["roster_id", "players", "owner_id"]
        rosterdf = rosterdf[keepcols]

        # Compile user data for each roster
        userdf = pd.DataFrame(users)

        # Narrowing to relevant fields
        keepcols = ["user_id", "display_name"]
        userdf = userdf[keepcols]

        # Compiling both dataframes
        compiled = rosterdf.merge(
            userdf, "left", left_on="owner_id", right_on="user_id"
        )

        print("COMPILED DF: ", compiled.head())

        keepcols = ["roster_id", "display_name", "players"]
        compiled = compiled[keepcols]

        # Storing columns for salary_total and players_total
        compiled["salary_total"] = 0
        compiled["players_total"] = 0

        print("FINAL DF: ", compiled.head())

        return compiled

    except Exception as e:

        return e


def get_teams(leagueID):

    try:

        # Instantiate league based on id
        league = League(leagueID)

        # Get data on all league users for team metadata
        users = league.get_users()

        # Get data on all rosters
        rosters = league.get_rosters()

        print("ROSTERS: ", rosters)

        # Compile team info
        teamsdf = compile_team_data(users, rosters)

        print("TEAM DF COMPILED: ", teamsdf.head())

        # Getting database name
        parent_path = dirname(__file__)
        dotenv_path = join(dirname(parent_path), ".env")

        print("PATH TO LOOKUP: ", dotenv_path)
        load_dotenv(dotenv_path)
        db = os.environ.get("POSTGRES_DB")

        # Post team data to postgres
        pgt.df_to_postgres(teamsdf, db, "rosters", method="replace")

        print("ROSTERS POSTED")

        return teamsdf

    except Exception as e:

        return e


def match_player_to_roster(player, rosters):

    match_id = "999"
    for index, row in rosters.iterrows():
        players = row["players"]
        if players != None:
            if player in players:
                match_id = row["roster_id"]
            else:
                pass
        else:
            pass

    return match_id


def get_most_recent_transaction(transactions):

    # Get most recent transaction
    transaction = transactions[0]
    transactionid = transaction["transaction_id"]

    print("TRANSACTION: ", transactionid)

    return str(transactionid)


def get_my_roster(roster_id):

    # Getting database name
    parent_path = dirname(__file__)
    dotenv_path = join(dirname(parent_path), ".env")

    print("PATH TO LOOKUP: ", dotenv_path)
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")

    query = f"""SELECT * FROM players WHERE roster_id='{roster_id}';"""
    rosterdf = pgt.df_from_postgres(query, db, "players")
    rosterdf.sort_values(by=["position", "salary"], inplace=True)

    rosterdf["salary"] = rosterdf["salary"].apply(lambda x: str(x))

    rosterdf.fillna("0", inplace=True)

    message = """| Position | Player | Team | Salary | \n"""

    for n, row in rosterdf.iterrows():
        playermessage = (
            "| "
            + row["position"]
            + " | "
            + row["player"]
            + " | "
            + row["team"]
            + " | "
            + row["salary"]
            + " |\n"
        )
        message = message + playermessage

    return message


def get_team_name(roster_id):

    # Getting database name
    parent_path = dirname(__file__)
    dotenv_path = join(dirname(parent_path), ".env")

    print("PATH TO LOOKUP: ", dotenv_path)
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")

    query = f"""SELECT display_name FROM rosters WHERE roster_id='{roster_id}';"""
    namedf = pgt.df_from_postgres(query, db, "rosters")
    print("NAMEDF: ", namedf.head())

    teamname = namedf["display_name"][0]

    returnstring = f"Current roster for _{teamname}_: \n"

    return returnstring


def get_team_cap(roster_id):

    # Getting database name
    parent_path = dirname(__file__)
    dotenv_path = join(dirname(parent_path), ".env")

    print("PATH TO LOOKUP: ", dotenv_path)
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")

    query = f"""SELECT display_name FROM rosters WHERE roster_id='{roster_id}';"""
    namedf = pgt.df_from_postgres(query, db, "rosters")
    print("NAMEDF: ", namedf.head())

    teamname = namedf["display_name"][0]

    returnstring = f"Current cap space for _{teamname}_: \n"

    return returnstring


def get_my_cap(roster_id):

    # Getting database name
    parent_path = dirname(__file__)
    dotenv_path = join(dirname(parent_path), ".env")

    print("PATH TO LOOKUP: ", dotenv_path)
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")

    query = f"""SELECT SUM(salary) FROM players WHERE roster_id='{roster_id}';"""
    capdf = pgt.df_from_postgres(query, db, "players")
    print("CAPDF: ", capdf.head())

    settings_query = f"""SELECT * FROM settings;"""
    settings_df = pgt.df_from_postgres(settings_query, db, "settings")
    print("SETTINGSDF: ", settings_df.head())

    currentcap = capdf["sum"][0]

    leaguecap = settings_df["salary_cap"][0]

    available = leaguecap - currentcap

    returnstring = f"Current cap spending is *${str(currentcap)}*. \n\nAvailable cap room is *${str(available)}*."

    return returnstring


def get_salary_csv():

    # Getting database name
    parent_path = dirname(__file__)
    dotenv_path = join(dirname(parent_path), ".env")

    print("PATH TO LOOKUP: ", dotenv_path)
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")

    query = f"""SELECT * FROM players;"""
    playersdf = pgt.df_from_postgres(query, db, "players")
    print("PLAYERSDF: ", playersdf.head())
    playersdf.to_csv("output/players.csv")
    print("STORED PLAYERS")

    return "output/players.csv"


def reset_salary_data(fname):

    try:

        # Open csv as df
        df = pd.read_csv(fname)

        # Format for push to postgres
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
        df = df[keepcols]

        # Getting database name
        parent_path = dirname(__file__)
        dotenv_path = join(dirname(parent_path), ".env")

        print("PATH TO LOOKUP: ", dotenv_path)
        load_dotenv(dotenv_path)
        db = os.environ.get("POSTGRES_DB")

        # Upload to postgres
        pgt.df_to_postgres(df, db, "players", method="replace")

        return "SUCCESSFULLY UPDATED LEAGUE"

    except Exception as e:

        return f"FAILED UPLOADING TO POSTGRES: {e}"


def get_roster_id(text):

    # Cleaning text
    text = text.lower().strip()

    lookupdict = {
        1: ["eddie", "kirkland", "process", "trust"],
        2: ["cory", "draper", "tampa", "badger"],
        3: ["will", "fortanbary", "essendon", "bombers"],
        4: ["jeff", "herbst", "kickers", "qb"],
        5: ["isaac", "wesley", "cleveland", "steamers"],
        6: ["nick", "nicholas", "bazemore", "tech", "gtech", "ga"],
        7: ["ryan", "atkinson", "rules", "sucks"],
        8: ["chris", "kirkland", "acworth", "eagles", "lame"],
        9: ["alex", "aghoian", "beats", "ray"],
        10: ["jeremy", "hess", "big", "home"],
    }

    roster_id = "9"

    for n in range(1, 11):
        id = n
        array = lookupdict[n]
        for word in array:
            if word in text:
                roster_id = str(id)
                break
            else:
                pass

    return str(roster_id)


def get_league_id():

    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    query = f"SELECT * FROM SETTINGS"
    settingsdf = pgt.df_from_postgres(query, db, "settings")

    # Getting transaction id from DataFrame
    transaction_id = settingsdf["league_id"][0]

    return transaction_id


def get_all_players():

    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    query = """SELECT COALESCE(p.player, p.team) as player,
                      p.position,
                      p.team,
                      p.salary,
                      r.display_name,
                      p.war,
                      p.value
                 FROM players p
      LEFT OUTER JOIN rosters r
                   ON p.roster_id::varchar(255)=r.roster_id::varchar(255)
             ORDER BY p.roster_id,
                      CASE WHEN position='QB' THEN 1
                           WHEN position='RB' THEN 2
                           WHEN position='WR' THEN 3
                           WHEN position='TE' THEN 4
                           WHEN position='K' THEN 5
                           WHEN position='DEF' THEN 6
                           WHEN injured_reserve='t' THEN 7 END,
                      p.salary DESC"""

    df_players = pgt.df_from_postgres(query, db, "players")

    df_players["war"] = pd.to_numeric(df_players["war"])
    df_players["value"] = pd.to_numeric(df_players["value"])
    df_players["war"] = df_players["war"].fillna("-999.0")
    df_players["value"] = df_players["value"].fillna("-999.0")

    df_json = df_players.to_json(orient="records")

    return df_json


def get_all_cap_status():

    # Get settings to retrieve cap min/max
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    query = f"SELECT * FROM SETTINGS"
    settingsdf = pgt.df_from_postgres(query, db, "settings")

    salary_cap = settingsdf["salary_cap"][0]
    roster_min = settingsdf["roster_min"][0]
    roster_max = settingsdf["roster_max"][0]

    query = """SELECT p.roster_id as roster_id,
                      r.display_name as display_name,
                      SUM(p.salary) AS current_salary,
                      SUM(CASE WHEN p.injured_reserve='f' THEN 1
                               ELSE 0
                               END) AS current_players
                 FROM players p
      LEFT OUTER JOIN rosters r
                   ON p.roster_id=r.roster_id
                WHERE p.roster_id<11
             GROUP BY p.roster_id, r.display_name
            """

    df_players = pgt.df_from_postgres(query, db, "players")

    settings_dict = {
        "salary_cap": str(salary_cap),
        "roster_min": str(roster_min),
        "roster_max": str(roster_max),
    }

    settings_json = json.dumps(settings_dict)

    league_json = df_players.to_json(orient="records")

    export_dict = {
        "settings": json.loads(settings_json),
        "league_data": json.loads(league_json),
    }

    return export_dict
