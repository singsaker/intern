from importlib.metadata import requires
import graphene
from .types import ProjectCategoryType, ProjectType, WorkType, ProjectMemberType
from .mutations import CreateProject, CreateWork
from .resolvers import ProjectResolvers, WorkResolvers
from members.types import MemberType


class ProjectMutations(graphene.ObjectType):
    create_project = CreateProject.Field()
    create_work = CreateWork.Field()
    # update_event


class ProjectQueries(graphene.ObjectType, ProjectResolvers):
    all_projects = graphene.List(ProjectType)
    project = graphene.Field(ProjectType, id=graphene.ID(required=True))
    project_member = graphene.Field(
        ProjectMemberType,
        project=graphene.ID(required=True),
        member=graphene.ID(required=True),
    )
    all_project_categories = graphene.List(ProjectCategoryType)
    project_category = graphene.Field(
        ProjectCategoryType, id=graphene.ID(required=True)
    )


class WorkQueries(graphene.ObjectType, WorkResolvers):
    all_work = graphene.List(
        WorkType,
        project=graphene.Int(required=False),
        member=graphene.Int(required=False),
    )
    total_time_spent = graphene.Field(
        graphene.String,
        project=graphene.Int(required=False),
        member=graphene.Int(required=False),
    )
