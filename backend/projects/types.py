from datetime import datetime
import graphene
from graphene_django import DjangoObjectType
from .models import Project, ProjectCategory, ProjectMember, Work, WorkCategory
from django.db.models import Sum


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class ProjectMemberType(DjangoObjectType):
    work_pending = graphene.String()
    work_approved = graphene.String()
    work_disapproved = graphene.String()

    class Meta:
        model = ProjectMember

    def resolve_work_pending(parent, info):
        totalDuration = Work.objects.filter(
            project=parent.project.id, member=parent.member.id, status=1
        ).aggregate(duration=Sum("duration"))["duration"]

        if totalDuration:
            return str(totalDuration.total_seconds())
        else:
            return "0"

    def resolve_work_approved(parent, info):
        totalDuration = Work.objects.filter(
            project=parent.project.id, member=parent.member.id, status=2
        ).aggregate(duration=Sum("duration"))["duration"]

        if totalDuration:
            return str(totalDuration.total_seconds())
        else:
            return "0"

    def resolve_work_disapproved(parent, info):
        totalDuration = Work.objects.filter(
            project=parent.project.id, member=parent.member.id, status=3
        ).aggregate(duration=Sum("duration"))["duration"]

        if totalDuration:
            return str(totalDuration.total_seconds())
        else:
            return "0"


class ProjectCategoryType(DjangoObjectType):
    class Meta:
        model = ProjectCategory
        fields = [
            "id",
            "name",
        ]


class WorkCategoryType(DjangoObjectType):
    class Meta:
        model = WorkCategory


class WorkType(DjangoObjectType):
    duration = graphene.String()
    status = graphene.Int()

    class Meta:
        model = Work

    @staticmethod
    def resolve_duration(parent: Work, info) -> str:
        return parent.duration.total_seconds()
