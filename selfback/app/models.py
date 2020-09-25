from datetime import datetime

from peewee import *
from app import db


class User(db.Model):
    owner = CharField(default=None, null=False)
    email = CharField(unique=True, default=None, null=False)
    auth_key = CharField(default=None)
    domain = CharField(null=False)
    name = CharField(null=False)
    currency = CharField(null=False)
    timezone = CharField(null=False)
    address = CharField(null=False)
    city = CharField(null=False)
    province = CharField(null=False)
    postalCode = CharField(null=False)
    country = CharField(null=False)
    token = CharField(default=None, null=True)
    created_at = DateTimeField(default=datetime.now())

    def __unicode__(self):
        return self.owner

    def serialize(self):
        return {
            'owner': self.owner,
            'email': self.email,
            'auth_key': self.auth_key,
            'domain': self.domain,
            'name': self.name,
            'currency': self.currency,
            'timezone': self.timezone,
            'address': self.address,
            'city': self.city,
            'province': self.province,
            'postalCode': self.postalCode,
            'country': self.country,
            'created_at': self.created_at
        }
