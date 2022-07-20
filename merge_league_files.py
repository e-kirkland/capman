import pandas as pd

old_league_roster = "./data/rosters_predraft_20220619.csv"
new_league_roster = "./data/rosters_postdraft_20220619.csv"
output_filepath = "./data/rosters_postdraft_rookies_20220619.csv"

# Import files
league_new = pd.read_csv(new_league_roster, index_col=0)
league_old = pd.read_csv(old_league_roster, index_col=0)

# Format DataFrames for merge
league_old = league_old.rename(
    columns={"salary": "salary_old", "injured_reserve": "injured_reserve_old"}
)
keepcols = ["player_id", "salary_old", "injured_reserve_old"]
league_old = league_old[keepcols]

# Merging based on player_id
merged = pd.merge(left=league_new, right=league_old, on="player_id", how="left")

# Format merged dataframe for re-ingest
keepcols = [
    "player_id",
    "player",
    "position",
    "team",
    "salary_old",
    "roster_id",
    "injured_reserve_old",
]
merged = merged[keepcols]
merged = merged.rename(
    columns={"salary_old": "salary", "injured_reserve_old": "injured_reserve"}
)

merged["player"] = merged["player"].fillna("")
merged["salary"] = merged["salary"].fillna(0)
merged["injured_reserve"] = merged["injured_reserve"].fillna(False)
merged["salary"] = merged["salary"].apply(lambda x: int(x))

# Increment salaries
def salary_increase(salary):
    if salary > 20:
        return int(1.1 * salary)
    elif salary <= 20 and salary > 0:
        return salary + 2
    elif salary >= 0:
        return salary
    else:
        raise Exception


# merged["salary"] = merged["salary"].apply(salary_increase)

merged.to_csv(output_filepath, index=None)
