#!/usr/bin/env bash

set -e

gunicorn -c gunicorn.conf.py wsgi:app
