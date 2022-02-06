import grp
import graphene
from projects.models import Project, Work
from projects.types import ProjectType, WorkType


class BaseProjectInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    hours = graphene.Int(required=False)
    description = graphene.String(required=False)
    project_category = graphene.ID(required=False)


class BaseWorkInput(graphene.InputObjectType):
    project = graphene.ID(required=True)
    task_category = graphene.ID(required=True)
    member = graphene.ID(required=True)

    description = graphene.String(required=False)
    duration = graphene.String(required=False)


class CreateProject(graphene.Mutation):
    class Arguments:
        project_data = BaseProjectInput(required=True)

    ok = graphene.Boolean()
    project = graphene.Field(ProjectType)

    def mutate(root, info, name):
        project = Project(name=name)
        ok = True
        return CreateProject(project=project, ok=ok)


class CreateWork(graphene.Mutation):
    class Arguments:
        project_data = BaseWorkInput(required=True)

    ok = graphene.Boolean()
    work = graphene.Field(WorkType)

    def mutate(root, info, name):
        work = Work(name=name)
        ok = True
        return CreateWork(work=work, ok=ok)
