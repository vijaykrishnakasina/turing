from flask import Flask
from .models import db
from .config import Config
from flask_cors import CORS
from flask_jwt_extended import JWTManager


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    CORS(app)
    jwt = JWTManager(app)

    from .main import main_blueprint
    from .authenticate import login_blueprint, register_blueprint
    from .messages import messages_blueprint

    app.register_blueprint(main_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(register_blueprint)
    app.register_blueprint(messages_blueprint)

    app.run(host='0.0.0.0', port=5000)

    return app
