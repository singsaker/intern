from .base import *  # noqa
from .base import env

# GENERAL
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["genfors.singsaker.no"])
CORS_ORIGIN_WHITELIST = env("CORS_ORIGIN_WHITELIST")

# URLs
ROOT_URLCONF = "singsaker_intern.urls"

# GRAPHENE
GRAPHQL_JWT = {"JWT_COOKIE_DOMAIN": env("JWT_COOKIE_DOMAIN", default="genfors.singsaker.no")}
