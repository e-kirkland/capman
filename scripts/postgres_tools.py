# Standard library imports
import os
from os.path import join, dirname 

# Third-party imports
from sqlalchemy import create_engine
import pandas as pd
import psycopg2
from dotenv import load_dotenv, find_dotenv

def postgres_connect(db_address, db_name):
    """Establishes connection with postgres db.

    Args:
        db_address (stringType): Path to postgresql database.
        db_name (stringType): table name

    Returns:
        output: List with two items:
            engine: Engine object for later sql operations
            cursor: Cursor object for later sql operations
    """
    assert isinstance(db_address, str), 'Postgres: database name must be string type'
    assert isinstance(db_name, str), 'Postgres: table name must be string type'

    # Reading in database
    try:
        address_string = db_address + db_name
        print("ADDRESS STRING: ", address_string)
        engine = create_engine(address_string)
        print("ENGINE CREATED: ", engine)
        connection = engine.raw_connection()
        print("CONNECTION CREATED: ", connection)
        cursor = connection.cursor()
        output = [engine, cursor]
        print(f'Connected to postgres database: {db_name}')
        return output

    except Exception as e:
        return f'Error in postgres connection: {e}'


def df_to_postgres(df, database, table, method='append'):
    """
    Loads dataframe to postgres table.

    Args:
        df: (pd.DataFrame) Dataframe to be uploaded
        database: (stringType) Name of database to connect
        table: (stringType) Name of table to upload data to
        method: (stringType) method for writing ('append', 'overwrite')

    Returns:

    """
    assert isinstance(df, pd.DataFrame), 'Postgres: upload requires a pandas dataframe'
    assert isinstance(database, str), 'Postgres: database name must be string type'
    assert isinstance(table, str), 'Postgres: table name must be string type'

    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path)
    db_path = os.environ.get('POSTGRES_CONTAINER')
    print("CONNECTING TO POSTGRES AT: ", str(db_path))

    # Accessing table in posgres db
    options = postgres_connect(db_path, database)
    engine = options[0]

    # Writing dataframe to table
    df.to_sql(table, con=engine, if_exists=method, index=False)


def df_from_postgres(query, database, table):
    """
    Compiling df from postgres table.

    Args:
        query: StringType, Query to be passed to postgres database
        database: StringType, Name of database to be queried
        table: StringType, Name of table to be queried

    Returns:
        pd.DataFrame, Dataframe of results from postgres query
    """
    assert isinstance(query, str), 'Postgres: query must be string type'
    assert isinstance(database, str), 'Postgres: database name must be string type'
    assert isinstance(table, str), 'Postgres: table name must be string type'

    # storing db_path
    # Getting tokens from env
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path)
    db_path = os.environ.get('POSTGRES_CONTAINER')
    print("CONNECTING TO POSTGRES AT: ", str(db_path))

    # Accessing table in posgres db
    options = postgres_connect(db_path, database)
    cursor = options[1]

    # Retrieving query results
    cursor.execute(query)
    tmp = cursor.fetchall()

    # Formatting results into dataframe
    col_names = []
    for elt in cursor.description:
        col_names.append(elt[0])

    df = pd.DataFrame(tmp, columns=col_names)

    # Counting records
    start_count = len(df)
    print(f'Queried {start_count} records from {table}')

    return df

def store_most_recent_transaction(leagueID, transaction_id):

    commands = (
    f"""
    UPDATE settings
       SET transaction_id='{str(transaction_id)}'
     WHERE league_id={int(leagueID)}
    """
    )

    try:

        # storing db_path
        # Getting tokens from env
        dotenv_path = join(dirname(__file__), '../.env')
        load_dotenv(dotenv_path)
        db_path = os.environ.get('POSTGRES_CONTAINER')
        print("CONNECTING TO POSTGRES AT: ", str(db_path))
        db = os.environ.get('POSTGRES_DB')
        print("DATABASE TO CONNECT TO: ", db)

        # Accessing table in posgres db
        options = postgres_connect(db_path, db)
        cursor = options[1]
        engine = options[0]
        conn = engine.raw_connection()

        # Create tables one by one
        for command in commands:
            cursor.execute(command)

        # Close communication
        cursor.close()

        # Commit changes
        conn.commit()

    except Exception as e:
        print(f"ERROR IN CREATING TABLES: {e}")

    finally:
        if conn is not None:
            conn.close()
