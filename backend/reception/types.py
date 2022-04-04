from graphene_django import DjangoObjectType

from .models import Semester, Shift, ShiftDate


class SemesterType(DjangoObjectType):
    class Meta:
        model = Semester


class ShiftType(DjangoObjectType):
    class Meta:
        model = Shift


class ShiftDateType(DjangoObjectType):
    class Meta:
        model = ShiftDate
