

import graphene

from django.core.exceptions import ValidationError
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token

from guardian.shortcuts import get_anonymous_user
from .types import UserType


class AuthUser(graphene.Mutation):
    token = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, token):
        info.context.set_jwt_cookie = token
