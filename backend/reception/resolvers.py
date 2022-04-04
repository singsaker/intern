from .models import Semester, Shift, ShiftDate


class ReceptionResolvers:
    def resolve_all_shift_dates(self, info, semester=None, member=None):
        if member:
            return ShiftDate.objects.filter(semester=semester, shifts__member=member)
        return ShiftDate.objects.filter(semester=semester)

    def resolve_shift_dates(self, info, id=None):
        try:
            if id:
                return ShiftDate.objects.get(id=id)
        except ShiftDate.DoesNotExist:
            return None

    def resolve_all_semesters(self, info):
        return Semester.objects.all()

    def resolve_semester(self, info, id=None):
        try:
            if id:
                return Semester.objects.get(id=id)
        except Semester.DoesNotExist:
            return None
