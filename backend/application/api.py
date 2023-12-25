from flask_restful import Resource, fields, marshal_with, reqparse, marshal
from application.models import *
# from flask_security import auth_required
from .database import db
import string, random
# from main import cache


cart_fields={
    'id':fields.Integer,
    'user_id':fields.Integer,
    'product_id':fields.Integer,
    'quantity':fields.Integer,
}

user_fields = {
    'id': fields.Integer,
    'email': fields.String,
    'name': fields.String,
    'role': fields.String,
    'cart': fields.Nested(cart_fields)
}

product_fields={
    'id': fields.Integer,
    'name':fields.String,
    'price':fields.Integer,
    'unit':fields.String,
    'expiry':fields.String,
    'availability':fields.Integer,
    'category_id':fields.Integer
}

category_fields={
    'id':fields.Integer,
    'name':fields.String,
    'products':fields.Nested(product_fields)
}



user_parser = reqparse.RequestParser()
user_parser.add_argument('email')
user_parser.add_argument('name')
user_parser.add_argument('password')
user_parser.add_argument('role')

class UserAPI(Resource):
    def get(self,email):
          user=User.query.filter_by(email=email).first()
          if not user:
              return {'message':'invalid email'},404
          else:
            return marshal(user,user_fields), 200


    def post(self):
        args=user_parser.parse_args()
        email=args.get('email',None)
        name=args.get('name',None)
        password=args.get('password',None)
        role=args.get('role',None)
        active=1
        fs_uniquifier = ''.join(random.choices(string.ascii_letters,k=10))
        if any(field is None for field in (email,name, password, role, active, fs_uniquifier)):
            return {"message":"One or more fields are empty"}, 400
        existinguser = User.query.filter_by(email=email).first()
        if existinguser:
            return {"message":"User account already exists"}, 400
        user = User(email=email,name=name,password=password,role=role,active=active,fs_uniquifier=fs_uniquifier)
        db.session.add(user)
        db.session.commit()
        return marshal(user,user_fields), 201
    


category_parser=reqparse.RequestParser()
category_parser.add_argument('name')

class CategoryAPI(Resource):
    def get(self):
        categories=Category.query.all()
        if not categories:
            return {'message': 'No categories found'},404
        else:
            return marshal(categories,category_fields),200

    
    def post(self):
        args=category_parser.parse_args()
        name=args.get('name',None)
        if any(field is None for field in (name)):
            return {"message":"One or more fields are empty"}, 400
        existingcategory = Category.query.filter_by(name=name).first()
        if existingcategory:
            return {"message":"Category already exists"}, 400
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()
        return marshal(category,category_fields), 200
    
    
    def put(self,id):
        args=category_parser.parse_args()
        name=args.get('name',None)
        if any(field is None for field in (name)):
            return {"message":"One or more fields are empty"}, 400
        updated_category=Category.query.filter_by(id=id).first()
        if updated_category:
            updated_category.name=name
            db.session.commit()
            return marshal(updated_category,category_fields),200
        else:
            return {'message':'category not found'},404
        

    def delete(self,id):
        delete_category=Category.query.filter_by(id=id).first()
        if not delete_category:
            return {'message':'category not found'},404
        db.session.delete(delete_category)
        db.session.commit()
        return {'message':'category deleted'},200
    


product_parser=reqparse.RequestParser()
product_parser.add_argument('name')
product_parser.add_argument('price')
product_parser.add_argument('unit')
product_parser.add_argument('expiry')
product_parser.add_argument('availability')
product_parser.add_argument('category_id') 

class ProductAPI(Resource):
    
    def get(self,id=None):
        if id is None:
            products=Product.query.all()
            if not products:
                return {'message':'No products found'},404
            return marshal(products,product_fields),200
        product=Product.query.get(id)
        if product:
            return marshal(product,product_fields),200
        else:
            return {"message":"Invalid product ID"},404

    def get(self,category_id):
          products=Product.query.filter_by(category_id=category_id).all()
          return marshal(products,product_fields),200
    
    
    def post(self):
        args=product_parser.parse_args()
        name=args.get('name',None)
        price=args.get('price',None)
        unit=args.get('unit',None)
        expiry=args.get('expiry',None)
        availability=args.get('availability',None)
        category_id=args.get('category_id',None)
        if any(field is None for field in (name, price, unit,expiry,availability, category_id)):
            return {"message":"One or more fields are empty"}, 400
        iscategory=Category.query.get(category_id)
        if not iscategory:
            return {"message":"given category doesn't exist"},400
        existingproduct=Product.query.filter_by(category_id=category_id,name=name).first()
        if existingproduct:
            return {"message":"product already exists in the given category"}
        product = Product(name=name,price=price,unit=unit,expiry=expiry,availability=availability,category_id=category_id)
        db.session.add(product)
        db.session.commit()
        return marshal(product,product_fields), 201
    
    def put(self,id):
        #if id is valid
        product=Product.query.get(id)
        if not product:
            return {"message":"Invalid product id"},404
        args=product_parser.parse_args()
        name=args.get('name',None)
        price=args.get('price',None)
        unit=args.get('unit',None)
        expiry=args.get('expiry',None)
        availability=args.get('availability',None)
        category_id=args.get('category_id',None)
        if any(field is None for field in (name, price, unit,expiry,availability, category_id)):
            return {"message":"One or more fields are empty"}, 400
        iscategory=Category.query.get(category_id)
        if not iscategory:
            return {"message":"given category doesn't exist"},400
        existingproduct=Product.query.filter_by(category_id=category_id,name=name).first()
        if existingproduct and existingproduct.id != product.id:
            return {"message":"product already exists in the given category"}
        updated_product=Product.query.filter_by(id=id).first()
        if updated_product:
            updated_product.name=name
            updated_product.price=price
            updated_product.unit=unit
            updated_product.expiry=expiry
            updated_product.availability=availability
            updated_product.category_id=category_id
            db.session.commit()
            return marshal(updated_product,product_fields),200
        else:
            return {'message':'Product not found'},400


    def delete(self,id):
        delete_product=Product.query.filter_by(id=id).first()
        if not delete_product:
            return {'message':'product not found'},404
        db.session.delete(delete_product)
        db.session.commit()
        return {'message':'product deleted'}
    

cart_parser=reqparse.RequestParser()
cart_parser.add_argument('user_id')
cart_parser.add_argument('product_id')
cart_parser.add_argument('quantity')

class CartAPI(Resource):
    def get(self,id=None):
        if id is None:
            cart=Cart.query.all()
            if not cart:
                return {"message":"No cart elements found"},400
        else:
            cart=Cart.query.filter_by(id=id).first()
            if not cart:
                return {"message":"invalid cart id"},400
        return marshal(cart,cart_fields),200
    
    @marshal_with(cart_fields)
    def post(self):
        args=cart_parser.parse_args()
        user_id=args.get('user_id',None)
        product_id=args.get('product_id',None)
        quantity=args.get('quantity',None)
        if any(field is None for field in (user_id,product_id,quantity)):
            return {"message":"One or more fields are empty"}, 400
        cart= Cart(user_id=user_id, product_id=product_id,quantity=quantity)
        db.session.add(cart)
        db.session.commit()
        return cart, 201
    
    @marshal_with(cart_fields)
    def put(self,id):
        args=cart_parser.parse_args()
        user_id=args.get('user_id',None)
        product_id=args.get('product_id',None)
        quantity=args.get('quantity',None)
        purchased=args.get('purchased',None)
        updated_cart=Cart.query.filter_by(id=id).first()
        if updated_cart:
            updated_cart.user_id=user_id
            updated_cart.product_id=product_id
            updated_cart.quantity=quantity
            updated_cart.purchased=purchased
           
            return updated_cart,200
        else:
            return {'message':'cart not found'},400


    def delete(self,id):
        delete_cart=Cart.query.filter_by(id=id).first()
        db.session.delete(delete_cart)
        db.session.commit()
        return {'message':'cart deleted'}

        
    
    
