from flask import jsonify, request, make_response
from flask_jwt_extended import jwt_required

from app.messages import messages_blueprint
from app.models import db, Message


@messages_blueprint.route('/messages', methods=['POST'])
@jwt_required()
def post_message():
    data = request.json
    # print( data)
    if not data or 'content' not in data:
        return make_response(jsonify({'error': 'Content is missing'}), 400)

    message = Message(content=data['content'], user=data['user'])
    db.session.add(message)
    db.session.commit()

    response_data = {
        'id': message.id,
        'content': message.content,
        'user': message.user
    }

    return make_response(jsonify(response_data), 201)


@messages_blueprint.route('/messages/<int:message_id>', methods=['PUT'])
@jwt_required()
def edit_message(message_id):
    data = request.json
    if not data or 'content' not in data:
        return make_response(jsonify({'error': 'Content is missing'}), 400)

    message = Message.query.get(message_id)
    if not message:
        return make_response(jsonify({'error': 'Message not found'}), 404)

    message.content = data['content']
    db.session.commit()
    response_data = {
        'id': message.id,
        'content': message.content,
        'user': message.user
    }

    return make_response(jsonify(response_data), 200)


@messages_blueprint.route('/messages/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    message = Message.query.get(message_id)
    if not message:
        return make_response(jsonify({'error': 'Message not found'}), 404)

    db.session.delete(message)
    db.session.commit()
    return jsonify({'message': 'Message deleted successfully'}), 200


@messages_blueprint.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([{'id': message.id, 'content': message.content, 'user': message.user} for message in messages])


@messages_blueprint.route('/messages/<string:user>', methods=['GET'])
def get_messages_by_user(user):
    messages = Message.query.filter_by(user=user).all()
    return jsonify([{'id': message.id, 'user': message.user, 'content': message.content} for message in messages])
