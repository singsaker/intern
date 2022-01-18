from django.contrib import admin

from .models import Project, ProjectCategory, Work, WorkCategory

admin.site.register(Project)
admin.site.register(ProjectCategory)
admin.site.register(Work)
admin.site.register(WorkCategory)