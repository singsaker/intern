import datetime

import graphene
from django.utils.dateparse import parse_date
from members.models import Member, Role

from .models import Semester, Shift, ShiftDate
from .types import ShiftType
from .utils.generate_shifts import generate_shifts


class GenerateShifts(graphene.Mutation):
    class Arguments:
        semester = graphene.ID(required=True)
        start_date = graphene.String(required=True)
        end_date = graphene.String(required=True)

    ok = graphene.Boolean()

    def mutate(root, info, semester, start_date, end_date):
        members = Member.objects.filter(
            active=True, role__type=Role.ONLY_RECEPTION
        ) | Member.objects.filter(active=True, role__type=Role.HYBRID)
        semester = Semester.objects.get(id=semester)
        num_days = (parse_date(end_date) - parse_date(start_date)).days
        start_day = parse_date(start_date).weekday()

        generated_shift_variables = generate_shifts(
            num_members=len(members),
            num_shifts=4,
            num_days=num_days,
            start_day=start_day,
        )

        date = parse_date(start_date)

        for days in generated_shift_variables.values():
            try:
                shift_date = ShiftDate.objects.get(date=date)
            except ShiftDate.DoesNotExist:
                shift_date = ShiftDate.objects.create(date=date, semester=semester)

            for k, v in days.items():
                if v and not (v == 2 and (date.weekday() < 5)):
                    Shift.objects.update_or_create(
                        shift_type=v,
                        shift_date=shift_date,
                        defaults={"member": members[k]},
                    )

            date += datetime.timedelta(days=1)

        return GenerateShifts(ok=True)


class ClearSemester(graphene.Mutation):
    class Arguments:
        semester = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(root, info, semester):
        semester = Semester.objects.get(id=semester)

        ShiftDate.objects.filter(semester=semester).delete()

        return ClearSemester(ok=True)


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
