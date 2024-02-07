from flask import Flask, render_template
from flask_socketio import SocketIO
import os

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

# SOCKETS
@socketio.on('toggle_start')
def event_toggle_start(data):
    print('toggle_start: ' + str(data))
    socketio.emit('toggle_start', data)

@socketio.on('motion')
def event_motion(data):
    print('motion: ' + str(data))
    socketio.emit('move', data)

@socketio.on('td')
def event_td(data):
    print('td: ' + str(data))

@socketio.on('connect')
def test_connect(auth):
    print('Client connected')
    socketio.emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

# ROUTES
@app.route('/')
def route_home():
    return render_template('index.html')

@app.route('/m')
def route_phone():
    return render_template('phone.html')


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 80))
    socketio.run(app, debug=True, port=port, host='0.0.0.0', keyfile='certs/key.pem', certfile='certs/cert.pem')
    # app.run(debug=True, host='0.0.0.0', port=port)
    # app.run(debug=True, host='0.0.0.0', port=port, ssl_context=("cert.pem", "key.pem"))