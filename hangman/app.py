import os
from flask import Flask, request, jsonify
from flask_api import status
from models.UserSessions import UserSessions
import json
import gameLogic
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'


UserSessionsCache = UserSessions()


@app.route('/')
def mainIndex():
    return app.send_static_file('index.html')


@app.route('/login', methods=['GET'])
def login():
    username = None
    try:
        username = request.args.get('username')
    except TypeError:
        return status.HTTP_401_UNAUTHORIZED
    if username is None:
        return '', status.HTTP_400_BAD_REQUEST
    response = UserSessionsCache.build_authentication_response(username)
    return jsonify(response)   


@app.route('/start', methods=['POST'])
def game_start():

    request.get_data()
    json_resquest = request.json
    session_key = json_resquest.get('session_key')
    if session_key is None :
        return '',status.HTTP_401_UNAUTHORIZED
    else:    
        response = gameLogic.start_game(session_key)
        return jsonify(response)



@app.route('/end', methods=['POST'])
def game_end():
    request.get_data()
    json_resquest = request.json
    try:
        didwin = int(request.args.get('won'))
        session_key = json_resquest.get('session_key')
        
    except TypeError:
        return '',status.HTTP_400_BAD_REQUEST

    if didwin < 1:
        gameLogic.end_game_without_update(session_key)
        return jsonify({"status": "ok"})

    score = json_resquest.get('score')
    username = UserSessionsCache.get_username_with_sessionKey(session_key)
    gameLogic.end_game_update_score(session_key, score, username)
    return jsonify({"status": "ok"})
        



@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(gameLogic.get_leadearboard())



# start the server
if __name__ == '__main__':
    app.run(debug=True)
