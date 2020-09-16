from os import environ


bind = f"{environ.get('SERVER_HOST', '0.0.0.0')}:{environ.get('SERVER_PORT', '8080')}"
max_requests = 1000
workers = 1
