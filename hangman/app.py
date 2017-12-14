import os
from flask import Flask, request, jsonify
from flask.ext.socketio import SocketIO, emit
from UserSessions import UserSessions
import gameLogic
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


UserSessionsCache = UserSessions()



@app.route('/')
def mainIndex():
    print('in hello world')
    return app.send_static_file('index.html')

@app.route('/login', methods = ['GET'])
def login():
    username = request.args.get('username')
    response = UserSessionsCache.build_authentication_response(username)
    return jsonify(response)




@socketio.on('start', namespace='/game')
def game_start(json_resquest):
    response = gameLogic.start_game(json_resquest.session_key)
    emit('started', jsonify(response))



@socketio.on('play', namespace='/game')
def game_play(json_resquest):
    emit('answer',jsonify(
        gameLogic.play_game(json_resquest.session_key, json_resquest.key_pressed)
        ))

@socketio.on('end', namespace='/game')
def game_play(json_resquest):
    emit('ended',jsonify(
        gameLogic.end_game(json_resquest.session_key)
        ))


# start the server
if __name__ == '__main__':
    socketio.run(app)