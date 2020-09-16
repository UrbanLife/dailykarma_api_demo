from datetime import datetime

from peewee import *
from app import db


class User(db.Model):
    username = CharField()
    email = CharField()
    created_at = DateTimeField(default=datetime.now())

    def __unicode__(self):
        return self.username

    def serialize(self):
        return {
            'username': self.username,
            'email': self.email
        }
