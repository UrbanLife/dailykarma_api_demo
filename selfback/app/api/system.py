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
    res_error = {
        'message': 'Bad request'
    }
    try:
        user = User.select().where(User.email == data['email']).get()
        user.auth_key = data['auth_key']
        user.username = data['username']
        user.email = data['email']
        user.save()
        return user.serialize(), 200
    except User.DoesNotExist:
        user = User.create(username=data['username'], email=data['email'], auth_key=data['auth_key'])
        user.save()
        return user.serialize(), 201
    except Exception as e:
        print(e)

    return res_error, 400


@system_bp.route('/user/token', methods=['POST'])
def user_token():
    """
    Set user auth token
    :return:
    """
    data = request.get_json()
    res = {'token': ''}
    res_error = {
        'message': 'Can not set user authorization token'
    }
    if 'token' in data:
        try:
            user = User.select().where(User.email == data['email']).get()
            user.token = data['token']
            user.save()
            return res, 200
        except User.DoesNotExist:
            ...
    else:
        try:
            user = User.select().where(User.email == data['email']).get()
            res['token'] = user.token
            return res, 200
        except Exception as e:
            ...

    return res_error, 400
