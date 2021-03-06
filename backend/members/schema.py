import graphene
import graphql_jwt

from .resolvers import MemberResolvers
from .types import MemberType, UserType


class MemberQueries(graphene.ObjectType, MemberResolvers):
    member = graphene.Field(MemberType, id=graphene.ID(required=True))
    all_users = graphene.List(UserType)
    all_members = graphene.List(MemberType)
    all_active_members = graphene.List(MemberType)
    user = graphene.Field(UserType)
    user_details = graphene.Field(UserType)
    send_email = graphene.Field(UserType)


class UserMutations(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    # Mulig bare romsjef skal ha mulighet til dette?
    # create_user = CreateUser.Field()
