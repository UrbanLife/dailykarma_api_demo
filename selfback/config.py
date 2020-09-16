import os

APP_ROOT = os.path.dirname(os.path.realpath(__file__))


class Config(object):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    API_HOST = '0.0.0.0'
    SERVER_PORT = 8080


class ProductionConfig(Config):
    DEBUG = False
    API_HOST = '0.0.0.0'
    SERVER_PORT = 8080
    DATABASE = os.path.join(APP_ROOT, 'dkapi.db')
