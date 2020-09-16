import os
from flask import Flask

from app.db import KarmaDB

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = KarmaDB(app)


def create_app():
    from app.api import system_bp

    with app.app_context():
        app.register_blueprint(system_bp)

        return app
