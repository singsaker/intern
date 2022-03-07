import graphene

from reception.schema import ReceptionQueries, ReceptionMutations
from shops.schema import ShopQueries
from members.schema import UserMutations, MemberQueries
from projects.schema import ProjectMutations, ProjectQueries, WorkQueries


class Queries(
    MemberQueries, ProjectQueries, WorkQueries, ShopQueries, ReceptionQueries
):
    pass


class Mutations(UserMutations, ProjectMutations, ReceptionMutations):
    pass


schema = graphene.Schema(query=Queries, mutation=Mutations)
