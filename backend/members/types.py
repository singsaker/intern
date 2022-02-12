from .models import Member, Role
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class MemberType(DjangoObjectType):
    class Meta:
        model = Member


class RoleType(DjangoObjectType):
    class Meta:
        model = Role
