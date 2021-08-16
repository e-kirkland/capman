# Standard library imports
import requests
import re
import sys, os
import json
from os.path import join, dirname
from datetime import datetime

# Third party imports
from flask import Flask, request, jsonify, Response, make_response
from flask_cors import CORS
import checkpointe as check
import redis
import slack
from slackeventsapi import SlackEventAdapter
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger


# Local imports
from scripts import api_calls as api
from scripts import initialize as init
from scripts import update as up

# Instantiating app
app = Flask(__name__)
port = int(os.environ.get("PORT", 3000))
# Enable CORS
cors = CORS(app)

# Getting tokens from env
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
bot_token = os.environ.get('SLACK_BOT_TOKEN')
user_token = os.environ.get('SLACK_USER_TOKEN')
secret = os.environ.get('SLACK_SECRET')
alert_channel = os.environ.get('ALERT_CHANNEL')

print("TOKENS: ", bot_token, user_token, secret)

# Instantiating slackbot
slack_event_adapter = SlackEventAdapter(secret,'/slack/events',app)
client = slack.WebClient(token=bot_token)
BOT_ID = client.api_call("auth.test")['user_id']

league_users = {
    "U011KTB2AMQ": 1,
    "U232RJNTH": 2,
    "U9CQGJH0S": 4,
    "UBV333PT8": 6,
    "U236W3RAM": 7,
    "U232X98MS": 8,
    "U9FL1AP2B": 9,
}

# Recognize files created
@slack_event_adapter.on('file_shared')
def file_upload(payload):
    print("FILE FOUND")
    event = payload.get('event', {})
    channel_id = event.get('channel_id')
    user_id = event.get('user_id')
    
    print("EVENT: ", event)

    if event != None and BOT_ID != user_id:

        client.chat_postMessage(channel=channel_id, text='Roster file received. Give me a moment to update the league...')

        file = event['file_id']
        channel = event['channel_id']

        try:
        
            user_client = slack.WebClient(token=user_token)
            result = user_client.api_call('files.sharedPublicURL', params={'file':file, 'channel':channel})
            print("RESULT: ", result)

            url = result['file']['url_private_download']
            print("URL: ", url)

            token = user_token
            resp = requests.get(url, headers={'Authorization': 'Bearer %s' % token})

            print("RESP: ", resp.headers)

            headers = resp.headers['content-disposition']
            output = 'output/'
            fname = output + re.findall("filename=(.*?);", headers)[0].strip("'").strip('"')

            assert not os.path.exists(fname), print("File already exists. Please remove/rename and re-run")
            out_file = open(fname, mode="wb+")
            print("FNAME: ", fname)
            out_file.write(resp.content)
            out_file.close()

            response = api.reset_salary_data(fname)
            print("RESPONSE: ", response)
        
            client.chat_postMessage(channel=channel_id, text='League updated, you are ready to roll!')

        except Exception as e:

            print(f"Exception: {e}")
            return e, 500

    return Response(), 200

# Message tester
@slack_event_adapter.on('message')
def message(payload):
    event = payload.get('event', {})
    channel_id = event.get('channel')
    user_id = event.get('user')
    text = event.get('text').lower()

    if user_id != None and BOT_ID != user_id:
        if text=='teams':
            client.chat_postMessage(channel=channel_id, text='Retrieving team info, just a moment...')
            api_response = get_teams()
            client.chat_postMessage(channel=channel_id, text=api_response)
            return Response(), 200
        elif 'roster' in text:
            roster_id = league_users[user_id]
            client.chat_postMessage(channel=channel_id, text='Retrieving your roster, just a moment...')
            teamname = api.get_team_name(roster_id)
            client.chat_postMessage(channel=channel_id, text=str(teamname))
            roster = api.get_my_roster(roster_id)
            client.chat_postMessage(channel=channel_id, text=str(roster))
            return Response(), 200
        elif text=='cap':
            roster_id = league_users[user_id]
            client.chat_postMessage(channel=channel_id, text='Calculating your cap space, hang on...') 
            print('USERID: ', user_id)
            cap = api.get_my_cap(roster_id)
            client.chat_postMessage(channel=channel_id, text=str(cap))
            return Response(), 200
        elif text=='users':
            users = event.get('users')
            print("Users: ", users)
            return Response(), 200
        else:
            client.chat_postMessage(channel=channel_id, text="I didn't understand your request, sorry.") 
            return Response(), 200

@app.route('/roster', methods=['POST'])
def get_roster():
    data = request.form
    print("DATA: ", data)
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    text = data.get('text')
    if len(text)!=0:
        roster_id = api.get_roster_id(text)
        client.chat_postMessage(channel=channel_id, text=f'Retrieving the roster, just a moment...')
        teamname = api.get_team_name(roster_id)
        client.chat_postMessage(channel=channel_id, text=str(teamname))
        roster = api.get_my_roster(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": roster
                                        }
                                    }
                                ])
        return Response(), 200
    else:
        roster_id = league_users[user_id]
        client.chat_postMessage(channel=channel_id, text='Retrieving your roster, just a moment...')
        teamname = api.get_team_name(roster_id)
        client.chat_postMessage(channel=channel_id, text=str(teamname))
        roster = api.get_my_roster(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": roster
                                        }
                                    }
                                ])
        return Response(), 200

@app.route('/cap', methods=['POST'])
def get_cap():
    data = request.form
    print("DATA: ", data)
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    text = data.get('text')
    if len(text)!=0:
        roster_id = api.get_roster_id(text)
        client.chat_postMessage(channel=channel_id, text='Calculating the cap space, hang on...') 
        print('USERID: ', user_id)
        teamname = api.get_team_cap(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": str(teamname)
                                        }
                                    }
                                ])
        cap = api.get_my_cap(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": str(cap)
                                        }
                                    }
                                ])
        return Response(), 200

    else:
        roster_id = league_users[user_id]
        client.chat_postMessage(channel=channel_id, text='Calculating your cap space, hang on...') 
        print('USERID: ', user_id)
        teamname = api.get_team_cap(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": teamname
                                        }
                                    }
                                ])
        cap = api.get_my_cap(roster_id)
        client.chat_postMessage(channel=channel_id, 
                                text='',
                                blocks=[
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": str(cap)
                                        }
                                    }
                                ])

        return Response(), 200

@app.route('/salary-reset', methods=['POST'])
def reset_salaries():
    data = request.form
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    client.chat_postMessage(channel=channel_id, text='Looks like you want to revise the league salaries. \nRetrieving league data for you to update, just a moment...')
    salarycsvfilename = api.get_salary_csv()

    print("PWD: ", os.getcwd())

    response = client.files_upload(
        channels=channel_id,
        file=salarycsvfilename,
        title="Current League Status"
    )
    print("RESPONSE: ", response)

    client.chat_postMessage(channel=channel_id, text='Here are the current player/roster/salary standings. Edit them and repost here to update the league.')

    return 'SUCCESS'

# Setup league with one slash comman, including leaguID
@app.route('/initialize', methods=['POST'])
def initialize_league():
    data = request.form
    print("DATA: ", data)
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    text = data.get('text')

    # Pull leagueID, salaryCap, rosterMin, rosterMax from text
    text_list = text.split(' ')
    leagueID=text_list[0]
    salaryCap=text_list[1]
    rosterMin=text_list[2]
    rosterMax=text_list[3]

    # Setting up league
    client.chat_postMessage(channel=channel_id, text=f"Let's do this. Setting up your league with id {leagueID}...")

    # Setting league player info from Sleeper
    try:
        # Setting up postgresql with schema based on leagueID
        return_val = init.setup_league(leagueID, salaryCap, rosterMin, rosterMax)

        # Confirming league setup
        client.chat_postMessage(channel=channel_id, text=f"Your league is set up. Now it's time to fill in salary info.")

        return_val = reset_salaries()

        return Response(), 200

    except Exception as e:

        return e, 500

# Adjusting settings
@app.route('/settings', methods=['POST'])
def change_settings():
    data = request.form
    print("DATA: ", data)
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    text = data.get('text')

    # Pull leagueID, salaryCap, rosterMin, rosterMax from text
    text_list = text.split(' ')
    salaryCap=text_list[0]
    rosterMin=text_list[1]
    rosterMax=text_list[2]

    # Update settings
    result = up.update_settings(salaryCap, rosterMin, rosterMax)

    if result=="SUCCESS":

        # Confirming league setup
        client.chat_postMessage(channel=channel_id, text=f"Settings changed.\nSalary cap: {salaryCap}\nRoster minimum: {rosterMin}\nRoster maximum: {rosterMax}") 

        return Response(), 200

    else:

        return "FAILURE SETTING UPDATE", 500

@app.route('/api/test/', methods=['GET'])
def test():
    try:
        return 'SUCCESS', 200
    except Exception as e:
        return f'FAIL {e}'

# Set league ID
@app.route('/api/setupLeague/', methods=['POST'])
def setup_league():

    leagueID = request.args.get('leagueID')

    print(f"SETTING LEAGUE ID AS {leagueID}")
    check.start(summary=True, verbose=True, memory=True)

    try:
        code_json = api.setup_league(leagueID)

        return code_json, 200

    except Exception as e:

        return f"LEAGUE ID SET ERROR: {e} \n Type: {type(e).__name__}", 500

# Get league transactions
@app.route('/api/getTransactions/', methods=['GET'])
def get_transactions():

    try:

        transactions = api.get_transactions()

        return str(transactions), 200

    except Exception as e:

        return f"TRANSACTION RETRIEVAL ERROR {e}", 500


# Get team info
@app.route('/api/getTeams/', methods=['GET'])
def get_teams():

    try:

        teams = api.get_teams()

        return str(teams), 200

    except Exception as e:

        return f"TEAM RETRIEVAL ERROR {e}", 500

# Get team info
@app.route('/api/checkTransaction/', methods=['GET'])
def check_transaction():

    try:

        leagueID = api.get_league_id()

        transactions = api.get_transactions(leagueID)
        print("ALL TRANSACTIONS: ", transactions)

        transactionID = api.get_most_recent_transaction(transactions)
        print("LATEST TRANSACTION FOUND: ", transactionID)

        lastTransaction = up.get_stored_transaction(leagueID)
        print("LAST STORED TRANSACTION: ", lastTransaction)

        if transactionID<=lastTransaction:
            print("SAME TRANSACTION, NO NEED TO UPDATE")
            return "NO UPDATE"
        elif transactionID>lastTransaction:
            print("NEW TRANSACTIONS FOUND, NEED TO UPDATE ROSTERS")
            up.update_from_transctions(transactions, lastTransaction)

            print("TRANSACTION EXECUTED, UPDATING LATEST TRANSACTION DATA IN SETTINGS")
            message = up.store_most_recent_transaction(leagueID, transactionID)

            return "NEW TRANSACTIONS"
        else:
            return "FAILURE"

    except Exception as e:

        return f"TRANSACTION UPDATE ERROR {e}"

# Main web landing page
@app.route('/', methods=['GET'])
def index():
    return "<h1>Welcome to the CapMan server!!</h1>"

def check_transactions():
    print('Checking transactions! The time is: %s' % datetime.now())
    result = check_transaction()

    compliance_result = up.check_compilance()

    if compliance_result:
        for result in compliance_result:
            team_name = result[0]
            salary = result[1]
            count = result[2]
            client.chat_postMessage(channel=alert_channel, text=f"Team {team_name} is out of compliance!\nSalary: ${salary}\nRoster count: {count}")

        return "TEAMS NOTIFIED", 200
    else:
        return "ALL TEAMS IN COMPLIANCE", 200

# Instantiating scheduler
sched = BackgroundScheduler(daemon=True)
sched.add_job(check_transactions, 'interval', minutes=30)
sched.start()

# Running app when called from python or gunicorn
if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=port)