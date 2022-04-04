from django.contrib import admin

from .models import Project, ProjectCategory, ProjectMember, Work, WorkCategory

admin.site.register(Project)
admin.site.register(ProjectCategory)
admin.site.register(Work)
admin.site.register(WorkCategory)


class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ("project", "member", "allocated_time")


admin.site.register(ProjectMember, ProjectMemberAdmin)
