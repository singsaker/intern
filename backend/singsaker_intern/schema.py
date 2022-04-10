import graphene
from members.schema import MemberQueries, UserMutations
from projects.schema import ProjectMutations, ProjectQueries, WorkQueries
from reception.schema import ReceptionMutations, ReceptionQueries
from shops.schema import ShopMutations, ShopQueries


class Queries(MemberQueries, ProjectQueries, WorkQueries, ShopQueries, ReceptionQueries):
    pass


class Mutations(UserMutations, ProjectMutations, ReceptionMutations, ShopMutations):
    pass


schema = graphene.Schema(query=Queries, mutation=Mutations)
