from datetime import timedelta

from django.forms import DurationField
from .models import Project, ProjectCategory, Work, WorkCategory, ProjectMember
from django.db.models import Sum
from django.db.models import Q


class ProjectResolvers:
    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_project_categories(self, info):
        return ProjectCategory.objects.all()

    def resolve_all_work_categories(self, info):
        return WorkCategory.objects.all()

    def resolve_project(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_project_category(self, info, id):
        try:
            return ProjectCategory.objects.get(id=id)
        except ProjectCategory.DoesNotExist:
            return None

    def resolve_project_member(self, info, project, member):
        try:
            return ProjectMember.objects.get(project=project, member=member)
        except ProjectMember.DoesNotExist:
            return None

    def resolve_all_project_members(self, info, project):
        return ProjectMember.objects.filter(project=project)


class WorkResolvers:
    def resolve_all_work(self, info, member=None, project=None):
        if member and project:
            return Work.objects.filter(member=member, project=project)

        if member:
            return Work.objects.filter(member=member)

        if project:
            return Work.objects.filter(project=project)

        return Work.objects.all()

    def resolve_total_time_spent(self, info, project=None, member=None):
        res = Work.objects.all()

        if project:
            res = res.filter(project=project)
        if member:
            res = res.filter(member=member)

        totalDuration = res.aggregate(duration=Sum("duration", filter=Q(status=2)))["duration"]

        if totalDuration:
            return str(totalDuration.total_seconds())
        else:
            return "0"
