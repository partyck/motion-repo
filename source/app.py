from flask import Flask, render_template
from flask_socketio import SocketIO
import os

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

@socketio.on('my_event')
def my_event(data):
    print('my_event: ' + str(data))


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 80))
    socketio.run(app, debug=True, port=port, host='0.0.0.0', keyfile='certs/key.pem', certfile='certs/cert.pem')
    # app.run(debug=True, host='0.0.0.0', port=port)
    # app.run(debug=True, host='0.0.0.0', port=port, ssl_context=("cert.pem", "key.pem"))