from reception.models import Semester
from .models import Member, Role
import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class MemberType(DjangoObjectType):
    class Meta:
        model = Member


# GQLType to fix graphene type bug conflicting with type field on Role
class RoleGQLType(DjangoObjectType):
    work_hours = graphene.Int()
    shift_number_FALL = graphene.Int()
    shift_number_SPRING = graphene.Int()

    class Meta:
        model = Role

    def resolve_work_hours(parent, info):
        return parent.work_hours()

    def resolve_shift_number_FALL(parent, info):
        return parent.shift_number(Semester.FALL)

    def resolve_shift_number_SPRING(parent, info):
        return parent.shift_number(Semester.SPRING)
