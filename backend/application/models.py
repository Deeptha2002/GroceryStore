from .database import db
from flask_security import UserMixin, RoleMixin

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True)
    # users = db.relationship('User', backref='role', cascade='all,delete-orphan')

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True, autoincrement=True, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String,nullable=False)
    role = db.Column(db.String,db.ForeignKey('role.name'))
    active = db.Column(db.Boolean)
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    cart=db.relationship('Cart',backref='user',cascade='all,delete-orphan')

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    products=db.relationship('Product',backref='category',cascade='all,delete-orphan')
 
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String, nullable=False)
    expiry = db.Column(db.String, nullable=False)
    availability = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    cart=db.relationship('Cart',backref='product')

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer,nullable=False)
    purchased=db.Column(db.Boolean,nullable=False)
    