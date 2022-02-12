import graphene
from members.types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.shortcuts import get_token


class CreateUser(graphene.Mutation):
    """
    mutation {
      getOrCreateUser(email: "test@domain.com", password: "YourPass") {
        token
        user {
          id
          email
          isActive
        }
      }
    }
    """

    user = graphene.Field(UserType)
    token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        gender = graphene.String(required=False)

    def mutate(
        self, info, username, password, email, first_name, last_name, gender="M"
    ):
        token = ""

        # Return token
        if get_user_model().objects.filter(username=username).exists():
            user = get_user_model().objects.get(username=username)
            token = get_token(user)

        # Create new user
        else:
            user = get_user_model()(
                username=username,
                email=email,
            )
            user.first_name = first_name
            user.last_name = last_name
            user.gender = gender
            user.set_password(password)
            user.save()

        return CreateUser(user=user, token=token)
