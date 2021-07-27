import base64
import collections
import os
import torch
import pymongo

from io import BytesIO
from datetime import datetime, timedelta
from PIL import Image
from flask import Flask, request, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restx import Api
from flask_socketio import SocketIO

from hub.authentification.authentification import api as api_authentification
from hub.analytics.analytics import api as api_analytics
from hub.detection.detection import api as api_detection

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)
api = Api(app)
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, resources={r"/*": {"origins": "*"}})

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["masklab"]
mycol = mydb["Stats"]
# JWT Config
app.config["JWT_SECRET_KEY"] = "this-is-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

api.add_namespace(api_authentification, path='/api/authentification')
api.add_namespace(api_analytics, path='/api/analytics')
api.add_namespace(api_detection, path='/api/detection')
directory_path = os.path.dirname(os.path.realpath(__file__))
model = torch.hub.load(f'{directory_path}/object_detection', 'custom',
                       path=f'{directory_path}/object_detection/last.pt',
                       source='local')


@socketio.on('connect', namespace='/web')
def connect_web():
    print('[INFO] Web client connected: {}'.format(request.sid))


@socketio.on('disconnect', namespace='/web')
def disconnect_web():
    print('[INFO] Web client disconnected: {}'.format(request.sid))


@socketio.on('connect', namespace='/cv')
def connect_cv():
    print('[INFO] CV client connected: {}'.format(request.sid))


@socketio.on('disconnect', namespace='/cv')
def disconnect_cv():
    print('[INFO] CV client disconnected: {}'.format(request.sid))


@socketio.on('cv2server')
def handle_cv_message(message):
    filename = 'image.jpg'  # I assume you have a way of picking unique filenames
    img_decode = Image.open(BytesIO(base64.b64decode(message)))
    img_decode.save(filename, 'PNG')
    results = model(img_decode, size=640)
    for img in results.render():
        buffered = BytesIO()
        img_base64 = Image.fromarray(img)
        img_base64.save(buffered, format="JPEG")
        results = results.pandas().xyxy[0].to_dict()
        message = {
            "image": "data:image/jpeg;base64,{}".format(base64.b64encode(buffered.getvalue())
                                                        .decode('utf-8')),
            "position": results
        }
        nb_mask_value = collections.Counter(list(results['class'].values()))

        mycol.insert_one({"no_mask": nb_mask_value[1],
                          "with_mask": nb_mask_value[0],
                          "timestamp": datetime.now()})
        socketio.emit('server2web', message, namespace='/web')


@app.route('/app')
def index():
    """Home page."""
    return render_template('index.html')


# model.classes = [1]
if __name__ == "__main__":
    socketio.run(app=app, host="0.0.0.0", debug=True, port=5001)
