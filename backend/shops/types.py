from graphene_django import DjangoObjectType

from .models import Product, ProductCategory, Sale, Shop


class ShopType(DjangoObjectType):
    class Meta:
        model = Shop


class ProductCategoryType(DjangoObjectType):
    class Meta:
        model = ProductCategory


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class SaleType(DjangoObjectType):
    class Meta:
        model = Sale
