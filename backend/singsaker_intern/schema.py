from members.schema import UserMutations
from members.schema import MemberQueries
import graphene


class Queries(
    MemberQueries
):
    pass

class Mutations(
  UserMutations
):
  pass


schema = graphene.Schema(query=Queries, mutation=Mutations)