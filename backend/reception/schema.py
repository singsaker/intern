from .mutations import CreateShift, DeleteShift, UpdateShift
import graphene
from .types import SemesterType, ShiftDateType
from .resolvers import ReceptionResolvers


class ReceptionQueries(graphene.ObjectType, ReceptionResolvers):
    all_shift_dates = graphene.List(ShiftDateType, semester=graphene.ID(required=True))
    shift_date = graphene.Field(ShiftDateType, id=graphene.ID(required=True))
    all_semesters = graphene.List(SemesterType)
    semester = graphene.Field(SemesterType, id=graphene.ID(required=True))

class ReceptionMutations(graphene.ObjectType):
    create_shift = CreateShift.Field()
    update_shift = UpdateShift.Field()
    delete_shift = DeleteShift.Field()
