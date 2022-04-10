import graphene

from .mutations import (
    CreateProduct,
    CreateProductCategory,
    CreateSale,
    DeleteProduct,
    DeleteProductCategory,
    UpdateProduct,
    UpdateProductCategory,
)
from .resolvers import ShopResolvers
from .types import SaleType, ShopType


class ShopQueries(graphene.ObjectType, ShopResolvers):
    all_shops = graphene.List(ShopType)
    all_sales = graphene.List(SaleType, shop=graphene.ID(required=True), member=graphene.ID(required=False))
    shop = graphene.Field(ShopType, slug=graphene.String(required=True))


class ShopMutations(graphene.ObjectType):
    create_product_category = CreateProductCategory.Field()
    update_product_category = UpdateProductCategory.Field()
    delete_product_category = DeleteProductCategory.Field()
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()
    create_sale = CreateSale.Field()
