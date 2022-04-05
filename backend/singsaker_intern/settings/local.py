from .base import *  # noqa
from .base import env

# GENERAL
DEBUG = True

SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="!!!SET DJANGO_SECRET_KEY!!!",
)

# URLs
ROOT_URLCONF = "singsaker_intern.urls"
ENVIRONMENT = env("DJANGO_ENVIRONMENT", default="development")
FRONTEND_BASE_URL = env("FRONTEND_BASE_URL", default="http://127.0.0.1:3000")

# ACCESS
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1", "backend"]
CORS_ORIGIN_WHITELIST = ["http://localhost:3000", "http://0.0.0.0:3000", "http://127.0.0.1:3000"]
CORS_ALLOW_CREDENTIALS = True
