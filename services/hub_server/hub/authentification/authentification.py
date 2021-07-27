import os
from functools import wraps

from dotenv import load_dotenv
from flask import jsonify, request, make_response
from flask_jwt_extended import jwt_required, create_access_token, get_jwt, verify_jwt_in_request
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
user = db["User"]
stat = db["Stats"]

api = Namespace('Metrics', description='')


def admin_required():
    def wrapper(function):
        @wraps(function)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            print(claims)
            if claims["is_administrator"]:
                return function(*args, **kwargs)
            return make_response(jsonify(msg="Admins only!"), 403)

        return decorator

    return wrapper


@api.route("/dashboard")
class Dashboard(Resource):
    @jwt_required()
    def get(self):
        return make_response(jsonify(message="Welcome! to the Data Science Learner"), 200)


@api.route("/register")
class Register(Resource):
    def post(self):
        from hub.webapp import bcrypt

        email = request.form["email"]
        # test = User.query.filter_by(email=email).first()
        user_info = user.find_one({"email": email})
        if user_info:
            return make_response(jsonify(message="User Already Exist"), 409)
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        password = bcrypt.generate_password_hash(request.form["password"])
        role = request.form["role"]
        user_info = dict(first_name=first_name, last_name=last_name, email=email, role=role,
                         password=password)
        user.insert_one(user_info)
        return make_response(jsonify(message="User added sucessfully"), 201)


@api.route("/login")
class Login(Resource):
    def post(self):
        from hub.webapp import bcrypt

        if request.is_json:
            email = request.json["email"]
            password = request.json["password"]
        else:
            email = request.form["email"]
            password = request.form["password"]

        user_info = user.find_one({"email": email}, {'_id': False})
        if user_info is None:
            return make_response(jsonify(message="Bad Email or Password"), 401)
        password_hash = bcrypt.check_password_hash(user_info['password'], password)
        if user_info and password_hash:
            if user_info['role'] == "Administrator":
                access_token = create_access_token(identity=email,
                                                   additional_claims={"is_administrator": True})
            else:
                access_token = create_access_token(identity=email,
                                                   additional_claims={"is_administrator": False})
            return make_response(jsonify(message="Login Succeeded!", access_token=access_token),
                                 201)
        return make_response(jsonify(message="Error"), 404)


@api.route("/delete_user/<email>")
class DeleteUser(Resource):
    @admin_required()
    @jwt_required()
    def delete(self, email):
        print(email)
        user_info = user.find_one_and_delete({"email": email})
        print("info", user_info)
        if user_info:
            return make_response(jsonify(message="User sucessfully deleted"), 201)
        return make_response(jsonify(message="User does not exist"), 404)


@api.route("/users")
class Users(Resource):
    @admin_required()
    @jwt_required()
    def get(self):
        user_info = list(user.find({}, {'_id': False, 'password': False}))
        print(user_info)
        return make_response(jsonify(users=user_info))


@api.route("/user/<email>")
class UpdateUser(Resource):
    @admin_required()
    @jwt_required()
    def put(self, email):
        print(email)
        mail = request.form["email"]
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        role = request.form["role"]
        user_info_dict = dict(first_name=first_name, last_name=last_name, email=mail, role=role)
        user_info = (user.find_one_and_update({"email": email},
                                              {"$set": user_info_dict},
                                              {'email': False, 'password': False})
                     )
        print(user_info)
        if user_info:
            return make_response(jsonify(users=user_info, message="User sucessfully edited"), 201)
        return make_response(jsonify(users=user_info, message="User does not exist"), 404)


@api.route("/password/<email>")
class Password(Resource):
    @admin_required()
    @jwt_required()
    def put(self, email):
        from hub.webapp import bcrypt
        password = bcrypt.generate_password_hash(request.form["password"])
        user_info_dict = dict(password=password)
        user_info = (user.find_one_and_update({"email": email},
                                              {"$set": user_info_dict},
                                              {'email': False, 'password': False})
                     )
        print(user_info)
        if user_info:
            return make_response(jsonify(users=user_info,
                                         message="Password sucessfully edited"), 201)
        return make_response(jsonify(users=user_info, message="User does not exist"), 404)
