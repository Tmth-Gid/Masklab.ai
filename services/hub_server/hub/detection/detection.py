import io
import time
from pathlib import Path

from PIL import Image
from flask import request, make_response, jsonify, Response
from flask_restx import Namespace, Resource, reqparse
from werkzeug.datastructures import FileStorage

api = Namespace('Detection', description='')

upload_parser = reqparse.RequestParser()
upload_parser.add_argument('image', location='files',
                           type=FileStorage, required=True, action="append")


@api.route("/upload")
class Upload(Resource):
    @api.expect(upload_parser)
    def post(self):
        from hub.webapp import model
        if request.files.get("image"):
            image_file = request.files["image"]
            image_bytes = image_file.read()

            img = Image.open(io.BytesIO(image_bytes))

            results = model(img, size=640)  # reduce size=320 for faster inference
            results.save(save_dir="./image_detection/")
            return make_response(results.pandas().xyxy[0].to_json(orient="records"), 201)
        return make_response(jsonify(message="Image non reconnu ou inexistante"), 404)


def gen(path):
    while True:
        time.sleep(0.5)
        with open(path, 'rb') as img:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img.read() + b'\r\n')


@api.route("/visualize")
class Visualize(Resource):
    def get(self):
        path = Path(__file__).parent / "../../image_detection/image0.jpg"
        return Response(gen(path),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
