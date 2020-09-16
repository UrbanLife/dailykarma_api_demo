#!/usr/bin/env python

from app import create_app
from app.models import User

app = create_app()


def create_tables():
    User.create_table()


if __name__ == "__main__":
    create_tables()
    app.run(host=f"{app.config['API_HOST']}", port=8080)
