from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request
# from flask import current_app as app
from app.models import User

system_bp = Blueprint('system_bp', __name__, url_prefix='/sys')


@system_bp.route('/user', methods=['GET'])
def user_info():
    data = request.get_json()
    usr = User.get(User.username == 'foo')

    return jsonify(usr.serialize()), 200
