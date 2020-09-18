from datetime import datetime

from peewee import *
from app import db


class User(db.Model):
    username = CharField(default=None)
    email = CharField(unique=True, default=None)
    auth_key = CharField(default=None)
    token = CharField(default=None, null=True)
    created_at = DateTimeField(default=datetime.now())

    def __unicode__(self):
        return self.username

    def serialize(self):
        return {
            'username': self.username,
            'email': self.email,
            'auth_key': self.auth_key,
            'created_at': self.created_at
        }
