from peewee import SqliteDatabase, Model


class KarmaDB(object):
    def __init__(self, app):
        self.app = app
        self.database = SqliteDatabase(app.config['DATABASE'])
        self.register_handlers()
        self.Model = self.get_model_class()

    def connect(self):
        if self.database.is_closed():
            self.database.connect()

    def close(self, exc):
        if not self.database.is_closed():
            self.database.close()

    def register_handlers(self):
        self.app.before_request(self.connect)
        self.app.teardown_request(self.close)

    def get_model_class(self):
        class BaseModel(Model):
            class Meta:
                database = self.database
        return BaseModel
