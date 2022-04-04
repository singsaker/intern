import graphene

from .mutations import (
    ClearSemester,
    CreateShift,
    DeleteShift,
    GenerateShifts,
    UpdateShift,
)
from .resolvers import ReceptionResolvers
from .types import SemesterType, ShiftDateType


class ReceptionQueries(graphene.ObjectType, ReceptionResolvers):
    all_shift_dates = graphene.List(
        ShiftDateType,
        semester=graphene.ID(required=True),
        member=graphene.ID(required=False),
    )
    shift_date = graphene.Field(ShiftDateType, id=graphene.ID(required=True))
    all_semesters = graphene.List(SemesterType)
    semester = graphene.Field(SemesterType, id=graphene.ID(required=True))


class ReceptionMutations(graphene.ObjectType):
    generate_shifts = GenerateShifts.Field()
    clear_semester = ClearSemester.Field()
    create_shift = CreateShift.Field()
    update_shift = UpdateShift.Field()
    delete_shift = DeleteShift.Field()
