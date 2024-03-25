from flask import Blueprint

register_blueprint = Blueprint('register', __name__)
login_blueprint = Blueprint('login', __name__)

from . import routes
