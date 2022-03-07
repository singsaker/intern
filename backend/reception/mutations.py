from members.models import Member
from .types import ShiftType
from .models import Semester, Shift, ShiftDate
import graphene


class CreateShift(graphene.Mutation):
    class Arguments:
        member = graphene.ID(required=True)
        semester = graphene.ID(required=True)
        date = graphene.Date(required=True)
        type = graphene.Int(required=True)

    ok = graphene.Boolean()
    shift = graphene.Field(ShiftType)

    def mutate(root, info, member, date, type, semester):
        try:
            member = Member.objects.get(id=member)
        except Member.DoesNotExist:
            return None

        try:
            semester = Semester.objects.get(id=semester)
        except ShiftDate.DoesNotExist:
            return None

        try:
            shift_date = ShiftDate.objects.get(date=date)
        except ShiftDate.DoesNotExist:
            shift_date = ShiftDate.objects.create(date=date, semester=semester)

        shift = Shift(member=member, shift_type=type, shift_date=shift_date)
        shift.save()
        ok = True
        return CreateShift(shift=shift, ok=ok)

class UpdateShift(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        member = graphene.ID(required=False)

    ok = graphene.Boolean()
    shift = graphene.Field(ShiftType)

    def mutate(self, info, id, member):
        try:
            shift = Shift.objects.get(id=id)
        except Shift.DoesNotExist:
            raise ValueError("Ugyldig vakt")
        
        try:
            member = Member.objects.get(id=member)
        except Shift.DoesNotExist:
            raise ValueError("Ugyldig beboer")

        shift.member = member
        shift.save()
        ok = True
        return UpdateShift(shift=shift, ok=ok)

class DeleteShift(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Shift.objects.get(id=kwargs["id"])
        obj.delete()
        return cls(ok=True)

