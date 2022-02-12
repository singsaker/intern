from importlib.metadata import requires
import graphene
from .types import (
    ProjectCategoryType,
    ProjectType,
    WorkCategoryType,
    WorkType,
    ProjectMemberType,
)
from .mutations import (
    CreateProject,
    CreateProjectMember,
    CreateWork,
    DeleteWork,
    GenerateSemesterProject,
    UpdateWork,
)
from .resolvers import ProjectResolvers, WorkResolvers
from members.types import MemberType


class ProjectMutations(graphene.ObjectType):
    create_project = CreateProject.Field()
    create_work = CreateWork.Field()
    update_work = UpdateWork.Field()
    delete_work = DeleteWork.Field()
    create_project_member = CreateProjectMember.Field()
    generate_semester_project = GenerateSemesterProject.Field()
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
        project=graphene.ID(required=False),
        member=graphene.ID(required=False),
    )
    all_work_categories = graphene.List(WorkCategoryType)
    total_time_spent = graphene.Field(
        graphene.String,
        project=graphene.ID(required=False),
        member=graphene.ID(required=False),
    )
