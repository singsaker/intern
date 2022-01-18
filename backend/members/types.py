from .models import User, Member
from graphene_django import DjangoObjectType

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "email", "username", "password")

class MemberType(DjangoObjectType):
    class Meta:
        model = Member
        fields = ("id", "first_name", "last_name")