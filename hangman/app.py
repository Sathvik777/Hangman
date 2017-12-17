import os
from flask import Flask, request, jsonify
#from flask.ext.socketio import SocketIO, emit
from models.UserSessions import UserSessions
import json
import gameLogic
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
#socketio = SocketIO(app)


UserSessionsCache = UserSessions()


@app.route('/')
def mainIndex():
    return app.send_static_file('index.html')


@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    response = UserSessionsCache.build_authentication_response(username)
    return jsonify(response)


@app.route('/start', methods=['POST'])
def game_start():

    request.get_data()
    json_resquest = request.json
    response = gameLogic.start_game(json_resquest.get('session_key'))
    return jsonify(response)



@app.route('/end', methods=['POST'])
def game_end():
    request.get_data()
    json_resquest = request.json
    session_key = json_resquest.get('session_key')
    score = json_resquest.get('score')
    username = UserSessionsCache.get_username_with_sessionKey(session_key)

    gameLogic.end_game(session_key, score, username)

    return jsonify({"status": "ok"})


@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return json.dumps(gameLogic.get_leadearboard())



# start the server
if __name__ == '__main__':
    app.run(debug=True)
