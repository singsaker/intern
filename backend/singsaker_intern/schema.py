from members.schema import UserMutations
from members.schema import MemberQueries
import graphene
from projects.schema import ProjectMutations, ProjectQueries, WorkQueries


class Queries(
    MemberQueries,
    ProjectQueries,
    WorkQueries
):
    pass

class Mutations(
  UserMutations,
  ProjectMutations
):
  pass


schema = graphene.Schema(query=Queries, mutation=Mutations)