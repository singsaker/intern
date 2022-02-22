from .types import ShopType
from .resolvers import ShopResolvers
import graphene


class ShopQueries(graphene.ObjectType, ShopResolvers):
    all_shops = graphene.List(ShopType)
    shop = graphene.Field(ShopType, id=graphene.ID(required=True))
