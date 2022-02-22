from shops.schema import ShopQueries
from members.schema import UserMutations, MemberQueries
import graphene
from projects.schema import ProjectMutations, ProjectQueries, WorkQueries


class Queries(
    MemberQueries,
    ProjectQueries,
    WorkQueries,
    ShopQueries,
):
    pass


class Mutations(UserMutations, ProjectMutations):
    pass


schema = graphene.Schema(query=Queries, mutation=Mutations)
