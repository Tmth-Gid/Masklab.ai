import datetime
import os

from dotenv import load_dotenv
from flask import jsonify, request, make_response
from flask_cors import cross_origin
from flask_restx import Namespace, Resource
from pymongo import MongoClient

if not os.getenv("DATABASE_URL"):
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
# Making a Connection with MongoClient
client = MongoClient(DATABASE_URL)
# database
db = client["masklab"]
# collection
stat = db["Stats"]

api = Namespace('Metrics', description='')


@api.route("/stats")
class Statistiques(Resource):
    @cross_origin()
    def post(self):
        no_mask = request.form["no_mask"]
        with_mask = request.form["with_mask"]
        timestamp = datetime.datetime.utcnow()
        stat_info = dict(no_mask=no_mask, with_mask=with_mask, timestamp=timestamp)
        stat.insert_one(stat_info)
        return make_response(jsonify(message="Stat added sucessfully"), 201)

    def get(self):
        stat_info = list(stat.find({}, {'_id': False, 'password': False}))
        print(stat_info)
        return make_response(jsonify(stats=stat_info))
