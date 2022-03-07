from django.contrib import admin

from .models import Semester, Shift, ShiftDate

# Register your models here.
admin.site.register(Semester)
admin.site.register(Shift)
admin.site.register(ShiftDate)
