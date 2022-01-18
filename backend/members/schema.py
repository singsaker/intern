import graphene
import graphql_jwt

from .types import UserType, MemberType
from .resolvers import MemberResolvers


class MemberQueries(graphene.ObjectType, MemberResolvers):
    all_users = graphene.List(UserType)
    all_members = graphene.List(MemberType)
    user = graphene.Field(UserType)
    user_details = graphene.Field(UserType)

class UserMutations(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
