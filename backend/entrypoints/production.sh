#!/bin/sh
set -e

python manage.py migrate
python manage.py collectstatic --noinput
./wait-for-it.sh postgres:5432 -- gunicorn config.wsgi:application --bind 0.0.0.0:8000
exec "$@"