from graphene_django import DjangoObjectType
from .models import Shop


class ShopType(DjangoObjectType):
    class Meta:
        model = Shop
