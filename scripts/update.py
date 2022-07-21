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

# Local Imports
from scripts import postgres_tools as pgt
from scripts import api_calls as api


def get_stored_transaction(leagueID):

    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    query = f"SELECT * FROM SETTINGS WHERE league_id={int(leagueID)}"
    settingsdf = pgt.df_from_postgres(query, db, "settings")

    # Getting transaction id from DataFrame
    transaction_id = settingsdf["transaction_id"][0]

    return transaction_id


def update_from_transctions(transactions, lastTransaction):

    # Setting up postgres connection
    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db_path = os.environ.get("POSTGRES_CONTAINER")
    print("CONNECTING TO POSTGRES AT: ", str(db_path))
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    # Accessing table in posgres db
    options = pgt.postgres_connect(db_path, db)
    cursor = options[1]
    engine = options[0]
    conn = engine.raw_connection()

    new_transactions = [
        x for x in transactions if int(x["transaction_id"]) > int(lastTransaction)
    ]

    # Sorting transactions in ascending order, so we execute each one in order
    new_transactions = sorted(new_transactions, key=lambda i: (i["transaction_id"]))

    for transaction in new_transactions:
        metadata = transaction["metadata"]
        print("TRANSACTION: ", transaction)
        # Waiver transactions
        if transaction["type"] == "waiver":
            if transaction["status"] == "complete":
                adds = transaction["adds"]
                drops = transaction["drops"]
                bid = transaction["settings"]["waiver_bid"]

                # Execute drops first
                if drops:
                    keys = [x for x in drops.keys()]
                    values = [x for x in drops.values()]
                    for n in range(0, len(keys)):
                        query = f"""
                            UPDATE players
                            SET roster_id='999',
                                salary=0
                            WHERE player_id='{str(keys[n])}'
                            """

                        print(query)

                        # Update players one by one
                        cursor.execute(query)

                # Then process additions
                if adds:
                    keys = [x for x in adds.keys()]
                    values = [x for x in adds.values()]

                    for n in range(0, len(keys)):
                        query = f"""
                            UPDATE players
                            SET roster_id={str(values[n])},
                                salary={int(bid)}
                            WHERE player_id='{str(keys[n])}'
                            """

                        print(query)

                        # Update players one by one
                        cursor.execute(query)
            else:
                # Close communication
                cursor.close()
                # Commit changes
                conn.commit()
                print("TRANSACTIONS_COMPLETED: ", new_transactions)
                return

        # Free Agent transactions
        if transaction["type"] == "free_agent":
            adds = transaction["adds"]
            drops = transaction["drops"]

            # Execute drops first
            if drops:
                keys = [x for x in drops.keys()]
                values = [x for x in drops.values()]
                for n in range(0, len(keys)):
                    query = f"""
                        UPDATE players
                        SET roster_id='999',
                            salary=0
                        WHERE player_id='{str(keys[n])}'
                        """

                    print(query)

                    # Update players one by one
                    cursor.execute(query)

            # Then process additions
            if adds:
                keys = [x for x in adds.keys()]
                values = [x for x in adds.values()]

                for n in range(0, len(keys)):
                    query = f"""
                        UPDATE players
                        SET roster_id={str(values[n])},
                            salary=1
                        WHERE player_id='{str(keys[n])}'
                        """

                    print(query)

                    # Update players one by one
                    cursor.execute(query)

        # All other transactions
        elif transaction["type"] != None:
            # Get all player adds
            adds = transaction["adds"]
            drops = transaction["drops"]
            budgets = transaction["waiver_budget"]

            # Check if this is a trade, if so need to keep salary data in tact
            if all(v is not None for v in [adds, drops]):
                keys = [x for x in adds.keys()]
                values = [x for x in adds.values()]
                drops_keys = [x for x in drops.keys()]
                if set(keys) == set(drops_keys):
                    print("TRADE DETECTED")

                    for n in range(0, len(keys)):
                        query = f"""
                            UPDATE players
                            SET roster_id={str(values[n])}
                            WHERE player_id='{str(keys[n])}'
                            """

                        print(query)

                        # Update players one by one
                        cursor.execute(query)

            else:

                # Execute drops first
                if drops:
                    keys = [x for x in drops.keys()]
                    values = [x for x in drops.values()]
                    for n in range(0, len(keys)):
                        query = f"""
                            UPDATE players
                            SET roster_id='999',
                                salary=0
                            WHERE player_id='{str(keys[n])}'
                            """

                        print(query)

                        # Update players one by one
                        cursor.execute(query)

                # Execute adds
                if adds:
                    keys = [x for x in adds.keys()]
                    values = [x for x in adds.values()]
                    if len(budgets) > 0:
                        for n in range(0, len(keys)):
                            query = f"""
                                UPDATE players
                                SET roster_id={str(values[n])},
                                    salary={int(budgets[n])}
                                WHERE player_id='{str(keys[n])}'
                                """

                            print(query)

                            # Update players one by one
                            cursor.execute(query)
                    else:
                        for n in range(0, len(keys)):
                            query = f"""
                                UPDATE players
                                SET roster_id={str(values[n])}
                                WHERE player_id='{str(keys[n])}'
                                """

                            print(query)

                            # Update players one by one
                            cursor.execute(query)

        # Free agent transactions
        else:
            # Close communication
            cursor.close()
            # Commit changes
            conn.commit()
            print("TRANSACTIONS_COMPLETED: ", new_transactions)
            return

    # Close communication
    cursor.close()
    # Commit changes
    conn.commit()
    print("TRANSACTIONS_COMPLETED: ", new_transactions)
    return


def store_most_recent_transaction(leagueID, lastTransaction):

    # Setting up postgres connection
    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db_path = os.environ.get("POSTGRES_CONTAINER")
    print("CONNECTING TO POSTGRES AT: ", str(db_path))
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    # Accessing table in posgres db
    options = pgt.postgres_connect(db_path, db)
    cursor = options[1]
    engine = options[0]
    conn = engine.raw_connection()

    query = f"UPDATE settings SET transaction_id={str(lastTransaction)} WHERE league_id={int(leagueID)}"

    # Update players one by one
    cursor.execute(query)

    # Close communication
    cursor.close()

    # Commit changes
    conn.commit()

    return "SUCCESS"


def check_compilance():

    # Setting up postgres connection
    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db_path = os.environ.get("POSTGRES_CONTAINER")
    print("CONNECTING TO POSTGRES AT: ", str(db_path))
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    # Get dataframe of all rosters
    query = "SELECT * FROM rosters"
    teamsdf = pgt.df_from_postgres(query, db, "rosters")

    # Get settings from table
    query = "SELECT * FROM settings"
    settingsdf = pgt.df_from_postgres(query, db, "settings")
    cap = settingsdf["salary_cap"][0]
    rosterMin = settingsdf["roster_min"][0]
    rosterMax = settingsdf["roster_max"][0]

    print("TEAMSDF: ", teamsdf.head())
    print("SETTINGSDF: ", settingsdf.head())

    roster_ids = [x for x in teamsdf["roster_id"]]

    # Empty list to store problem teams
    problemdata = []
    for n in range(0, len(roster_ids)):
        id = roster_ids[n]

        team_name = teamsdf["display_name"][n]

        # Get players for this roster
        query = f"SELECT * FROM players WHERE roster_id='{id}'"
        teamdf = pgt.df_from_postgres(query, db, "settings")

        print("COMPLIANCE CHECK - TEAM DF: ", teamdf.head())
        print(teamdf["injured_reserve"].head())

        # Get roster totals without injured_reserve
        roster_df = teamdf[teamdf["injured_reserve"] == "f"]
        players_total = len(roster_df)

        # Get salary total from all players, including injured_reserve
        salary_total = teamdf["salary"].sum()

        print(f"SALARY: cap: {cap}, total: {salary_total}")
        print(
            f"PLAYER TOTAL: min: {rosterMin}, max: {rosterMax}, roster: {players_total}"
        )

        # Check totals against cap values
        if (
            (salary_total > cap)
            | (players_total < rosterMin)
            | (players_total > rosterMax)
        ):
            print(f"{team_name} NOT IN COMPLIANCE: {salary_total}, {players_total}")

            error_team = [team_name, salary_total, players_total]
            problemdata.append(error_team)
        else:
            print(f"{team_name} IN COMPLIANCE")
            pass

    if len(problemdata) > 0:

        return problemdata

    else:

        return None


def update_settings(salaryCap, rosterMin, rosterMax):

    # Setting up postgres connection
    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), "../.env")
    load_dotenv(dotenv_path)
    db_path = os.environ.get("POSTGRES_CONTAINER")
    print("CONNECTING TO POSTGRES AT: ", str(db_path))
    db = os.environ.get("POSTGRES_DB")
    print("DATABASE TO CONNECT TO: ", db)

    # Get settings from table
    query = "SELECT * FROM settings"
    settingsdf = pgt.df_from_postgres(query, db, "settings")
    oldcap = settingsdf["salary_cap"][0]
    oldmin = settingsdf["roster_min"][0]
    oldmax = settingsdf["roster_max"][0]

    settingsdf["salary_cap"] = settingsdf["salary_cap"].replace(
        [oldcap], int(salaryCap)
    )
    settingsdf["roster_min"] = settingsdf["roster_min"].replace(
        [oldmin], int(rosterMin)
    )
    settingsdf["roster_max"] = settingsdf["roster_max"].replace(
        [oldmax], int(rosterMax)
    )

    # Replace values
    pgt.df_to_postgres(settingsdf, db, "settings", method="replace")

    return "SUCCESS"

