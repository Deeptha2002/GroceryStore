from flask_restful import Resource, fields, marshal_with, reqparse, marshal
from application.models import Users,Categories,Products,Cart
from flask_security import auth_required
from .database import db
# import string, random
# from main import cache

user_fields = {
    'Id': fields.Integer,
    'Email': fields.String,
    'User_name': fields.String,
    'Role': fields.String
}

user_parser = reqparse.RequestParser()
user_parser.add_argument('Email')
user_parser.add_argument('Password')

class UserLoginAPI(Resource):
    @marshal_with(user_fields)
    def get(self,Email):
          user=Users.query.filter_by(Email=Email).first()
          return user, 200
    
    
