from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token

from app.authenticate import register_blueprint, login_blueprint

users = {
    'user1': {'password': 'password1'},
    'user2': {'password': 'password2'}
}


@register_blueprint.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if username in users:
        return jsonify({'message': 'User already exists'}), 400

    users[username] = {'password': password}
    return jsonify({'message': 'User created successfully'}), 201


@login_blueprint.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username not in users or users[username]['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
