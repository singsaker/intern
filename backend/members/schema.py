from atexit import register
import graphene
import graphql_jwt
from members.mutations import CreateUser

from .types import UserType, MemberType
from .resolvers import MemberResolvers


class MemberQueries(graphene.ObjectType, MemberResolvers):
    all_users = graphene.List(UserType)
    all_members = graphene.List(MemberType)
    all_active_members = graphene.List(MemberType)
    user = graphene.Field(UserType)
    user_details = graphene.Field(UserType)


class UserMutations(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    # Mulig bare romsjef skal ha mulighet til dette?
    # create_user = CreateUser.Field()
