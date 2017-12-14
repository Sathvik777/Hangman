import os
from flask import Flask, session
from flask.ext.socketio import SocketIO, emit
import uuid

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def mainIndex():
    print('in hello world')
    return app.send_static_file('index.html')

@socketio.on('connect')
def handle_message(username):
    print('received message: ' + username)
    emit('word',"3dhubs")


@socketio.on('game', namespace='/start')
def handle_message(username):
    print('received message: ' + username)
    emit('word',"3dhubs")




# start the server
if __name__ == '__main__':
    socketio.run(app)