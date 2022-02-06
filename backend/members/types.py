from .models import  Member
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class MemberType(DjangoObjectType):
    class Meta:
        model = Member
        fields = ("id", "first_name", "last_name", "gender")
