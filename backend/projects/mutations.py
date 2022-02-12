import grp
from importlib.metadata import requires
from members.models import Member
import graphene
from projects.models import Project, Work, ProjectMember, ProjectCategory, WorkCategory
from projects.types import ProjectType, WorkType


class BaseProjectInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    project_category = graphene.ID(required=True)
    hours = graphene.Int(required=False)
    description = graphene.String(required=False)


class BaseWorkInput(graphene.InputObjectType):
    project = graphene.ID(required=True)
    task_category = graphene.ID(required=True)
    member = graphene.ID(required=True)

    description = graphene.String(required=False)
    duration = graphene.String(required=False)


class UpdateWorkInput(graphene.InputObjectType):
    status = graphene.Int(required=False)


class BassProjectMemberInput(graphene.InputObjectType):
    member = graphene.ID(required=True)
    project = graphene.ID(required=True)
    allocated_time = graphene.Int(required=False)


class CreateProjectMember(graphene.Mutation):
    class Arguments:
        member = graphene.ID(required=True)
        project = graphene.ID(required=True)
        allocated_time = graphene.Int(required=False)

    ok = graphene.Boolean()
    project_member = graphene.Field(ProjectType)

    def mutate(root, info, member, project, allocated_time):
        project_member = ProjectMember(
            member=member, project=project, allocated_time=allocated_time
        )
        ok = True
        return CreateProjectMember(project_member=project_member, ok=ok)


class CreateProject(graphene.Mutation):
    class Arguments:
        project_data = BaseProjectInput(required=True)

    ok = graphene.Boolean()
    project = graphene.Field(ProjectType)

    def mutate(root, info, project_data):
        project = Project()

        for k, v in project_data.items():
            setattr(project, k, v)

        project.save()

        ok = True
        return CreateProject(project=project, ok=ok)


class GenerateSemesterProject(graphene.Mutation):
    class Arguments:
        project_data = BaseProjectInput(required=True)

    ok = graphene.Boolean()
    project = graphene.Field(ProjectType)

    def mutate(
        root,
        info,
        project_data=None,
    ):
        project_category = ProjectCategory.objects.get(id=project_data.project_category)
        project = Project()

        for k, v in project_data.items():
            if not k == "project_category":
                setattr(project, k, v)

        project.project_category = project_category
        project.save()

        ok = True

        # Find members
        members = Member.objects.filter(active=True).exclude(role__isnull=True)

        # Create project members
        for i, member in enumerate(members):
            ProjectMember.objects.create(
                member=member, project=project, allocated_time=member.role.work_hours
            )

        return GenerateSemesterProject(project=project, ok=ok)


class CreateWork(graphene.Mutation):
    class Arguments:
        work_data = BaseWorkInput(required=True)

    ok = graphene.Boolean()
    work = graphene.Field(WorkType)

    def mutate(root, info, work_data=None):
        work = Work(description=work_data.description, duration=work_data.duration)
        project = Project.objects.get(id=work_data.project)
        member = Member.objects.get(id=work_data.member)
        task_category = WorkCategory.objects.get(id=work_data.task_category)

        work.member = member
        work.project = project
        work.task_category = task_category
        work.save()

        ok = True

        return CreateWork(work=work, ok=ok)


class UpdateWork(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        work_data = UpdateWorkInput(required=False)

    ok = graphene.Boolean()
    work = graphene.Field(WorkType)

    def mutate(self, info, id, work_data):
        try:
            work = Work.objects.get(pk=id)
        except Work.DoesNotExist:
            raise ValueError("Ugyldig arrangement")

        for k, v in work_data.items():
            setattr(work, k, v)
        work.save()
        ok = True
        return UpdateWork(work=work, ok=ok)


class DeleteWork(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Work.objects.get(pk=kwargs["id"])
        obj.delete()
        return cls(ok=True)
