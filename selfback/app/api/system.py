from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request
# from flask import current_app as app
from app.models import User

system_bp = Blueprint('system_bp', __name__, url_prefix='/api')


@system_bp.route('/user', methods=['POST'])
def user_info():
    """
    Get user information by it's auth_key
    :return:
    """
    data = request.get_json()
    if 'auth_key' in data:
        try:
            user = User.get(User.auth_key == data['auth_key'])
            return jsonify(user.serialize()), 200
        except Exception as e:
            return {}, 404


@system_bp.route('/auth', methods=['POST'])
def check_auth():
    """
    Check whether user was authorized or not
    :return:
    """
    data = request.get_json()
    res = {'authorized': False}

    if 'auth_key' in data:
        try:
            user = User.get(User.auth_key == data['auth_key'])
            if user is not None:
                res['authorized'] = True
        except Exception as e:
            return res, 200

    return res, 200


@system_bp.route('/user/key', methods=['POST'])
def set_user_auth_key():
    """
    Get user information by it's auth_key
    :return:
    """
    data = request.get_json()
    res = {'auth_key': ''}
    res_error = {
        'error': {
            'message': 'Can not set authorization key'
        }
    }
    if 'auth_key' in data:
        try:
            user = User.create(username='test', email='test@email.com', auth_key=data['auth_key'])
            user.save()
            res['auth_key'] = user.auth_key
            return res, 201
        except Exception as e:
            ...

    return res_error, 400


@system_bp.route('/user/token', methods=['POST'])
def set_user_token():
    """
    Set user auth token
    :return:
    """
    data = request.get_json()
    res = {'token': ''}
    res_error = {
        'error': {
            'message': 'Can not set user authorization token'
        }
    }
    if 'token' in data:
        try:
            user = User.select().where(User.username == 'test').get()
            user.token = data['token']
            user.save()
            return res, 200
        except Exception as e:
            ...

    return res_error, 400