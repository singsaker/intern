from datetime import datetime
import graphene
from graphene_django import DjangoObjectType
from .models import Project, ProjectCategory, ProjectMember, Work, WorkCategory


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class ProjectMemberType(DjangoObjectType):
    class Meta:
        model = ProjectMember
        fields = [
            "id",
            "member",
            "project",
            "allocated_time",
        ]


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
