from datetime import datetime
import graphene
from graphene_django import DjangoObjectType
from .models import Project, ProjectCategory, ProjectMember, Work


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "hours",
            "description",
            "members",
            "project_category",
            "start_date",
        ]


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


class WorkType(DjangoObjectType):
    # duration = graphene.String()

    class Meta:
        model = Work
        fields = ["id", "project", "description", "status", "member", "duration"]

    # @staticmethod
    # def resolve_duration(parent: Work, info) -> str:
    #     return str(parent.duration)
