import graphene

from .resolvers import ShopResolvers
from .types import ShopType


class ShopQueries(graphene.ObjectType, ShopResolvers):
    all_shops = graphene.List(ShopType)
    shop = graphene.Field(ShopType, slug=graphene.String(required=True))
