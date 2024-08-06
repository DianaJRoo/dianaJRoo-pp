"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import bcrypt





from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200



@api.route('/register', methods=['POST'])
def create_user():
    request_body = request.get_json()

    # Verificar si se proporcionaron datos en la solicitud
    if not request_body:
        return jsonify({"msg": "No data provided"}), 400

    user_name = request_body.get('user_name')
    password = request_body.get('password')
    sur_name = request_body.get('sur_name')
    name = request_body.get('name')

    # Verificar si se proporcionaron username, contraseña, ame y surname
    if not user_name:
        return jsonify({'msg': 'Username required'}), 400

    if not password:
        return jsonify({'msg': 'Password required'}), 400
    
    if not name or not sur_name:
        return jsonify({'msg': 'Name and surname required'}), 400

    

    # Verificar si el username ya está registrado
    existing_user = User.query.filter_by(user_name=user_name).first()
    if existing_user:
        return jsonify({'msg': 'Username already exists'}), 409

    try:
        # Generar sal y hash de la contraseña
        salt = bcrypt.gensalt()
        hash_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        # Crear un nuevo usuario
        new_user = User(user_name=user_name, password=hash_password.decode('utf-8'), salt=salt.decode('utf-8'), name=name, sur_name=sur_name)
        db.session.add(new_user)
        db.session.commit()

        # Devolver la respuesta con los detalles del nuevo usuario
        return jsonify({"msg": "User registered successfully", "user": new_user.serialize()}), 201
    except Exception as e:
        # Revertir la transacción en caso de error
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 400




@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).one_or_none()
    return jsonify(user.serialize()), 200

@api.route('/login', methods=['POST'])
def login():
    user_name = request.json.get('user_name', None)
    password = request.json.get('password', None)

    if not user_name or not password:
        return jsonify({'msg': 'username and password required'}), 400
    
    user = User.query.filter_by(user_name=user_name).one_or_none()
    
    if user is not None:
        check = bcrypt.checkpw(bytes(password, 'utf-8'), bytes(user.password, 'utf-8'))
        if check:
            access_token = create_access_token(identity=user_name)
            return jsonify({'token': access_token, 'identity': user.serialize()}), 200
        else:
            return jsonify({'msg': 'wrong password'}), 404
    else:
        return jsonify({'msg': 'user not found'}), 404