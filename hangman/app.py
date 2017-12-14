import os
from flask import Flask, request, jsonify
#from flask.ext.socketio import SocketIO, emit
from models.UserSessions import UserSessions
import gameLogic
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
#socketio = SocketIO(app)


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




@app.route('/start', methods = ['POST'])
def game_start():

    request.get_data()
    json_resquest = request.json
    print(json_resquest.get('session_key'))
    response = gameLogic.start_game(json_resquest.get('session_key'))
    return jsonify(response)



@app.route('/play', methods = ['POST'])
def game_play():
    request.get_data()
    json_resquest = request.json
    response = gameLogic.play_game(json_resquest.get('session_key'), json_resquest.get('key_pressed'))
        
    return jsonify(response)


@app.route('/end', methods = ['POST'])
def game_end():
    json_resquest = request.body
    gameLogic.end_game(json_resquest.session_key)
    
    return jsonify({"status": "ok"})


# start the server
if __name__ == '__main__':
    app.run(debug=True)