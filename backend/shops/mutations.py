from datetime import datetime

import graphene
from members.models import Member

from .models import Product, ProductCategory, Sale, Shop
from .types import ProductCategoryType, ProductType, SaleType


class ProductBaseInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    description = graphene.String(required=False)
    price = graphene.Decimal()
    quantity = graphene.Int()


class CreateProductCategory(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=False)
        shop = graphene.ID(required=True)

    ok = graphene.Boolean()
    product_category = graphene.Field(ProductCategoryType)

    def mutate(root, info, name=None, description=None, shop=None):
        shop = Shop.objects.get(id=shop)
        product_category = ProductCategory(name=name, description=description, shop=shop)
        product_category.save()

        ok = True

        return CreateProductCategory(product_category=product_category, ok=ok)


class UpdateProductCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String(required=True)
        description = graphene.String(required=False)

    ok = graphene.Boolean()
    product_category = graphene.Field(ProductCategoryType)

    def mutate(root, info, name=None, description=None, id=None):
        product_category = ProductCategory.objects.get(id=id)
        product_category.name = name
        product_category.description = description
        product_category.save()

        ok = True

        return UpdateProductCategory(product_category=product_category, ok=ok)


class DeleteProductCategory(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = ProductCategory.objects.get(pk=kwargs["id"])
        obj.delete()
        return cls(ok=True)


class CreateProduct(graphene.Mutation):
    class Arguments:
        shop = graphene.ID(required=True)
        product_categories = graphene.List(graphene.ID)
        product_data = ProductBaseInput()

    ok = graphene.Boolean()
    product = graphene.Field(ProductType)

    def mutate(root, info, shop, product_categories=None, product_data=None):
        product = Product()

        for k, v in product_data.items():
            setattr(product, k, v)

        shop = Shop.objects.get(id=shop)
        product.shop = shop
        product.save()

        if product_categories:
            product.product_categories.set(ProductCategory.objects.get(id=id) for id in product_categories)
        product.save()

        ok = True

        return CreateProduct(product=product, ok=ok)


class UpdateProduct(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        product_categories = graphene.List(graphene.ID)
        product_data = ProductBaseInput()

    ok = graphene.Boolean()
    product = graphene.Field(ProductType)

    def mutate(root, info, id, product_categories=None, product_data=None):
        product = Product.objects.get(id=id)

        for k, v in product_data.items():
            setattr(product, k, v)

        product.save()

        if product_categories is not None:
            product.product_categories.set(ProductCategory.objects.get(id=id) for id in product_categories)
        product.save()

        ok = True

        return UpdateProduct(product=product, ok=ok)


class DeleteProduct(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Product.objects.get(pk=kwargs["id"])
        obj.delete()
        return cls(ok=True)


class CreateSale(graphene.Mutation):
    class Arguments:
        member = graphene.ID(required=True)
        shop = graphene.ID(required=True)
        product = graphene.ID(required=True)
        quantity = graphene.Int(required=True)

    ok = graphene.Boolean()
    sale = graphene.Field(SaleType)

    def mutate(root, info, shop, member, product, quantity):
        shop = Shop.objects.get(id=shop)
        member = Member.objects.get(id=member)
        product = Product.objects.get(id=product)

        sale = Sale(shop=shop, member=member, product=product)
        sale.date = datetime.now()
        sale.quantity = quantity
        sale.price = product.price
        sale.save()

        ok = True

        return CreateSale(sale=sale, ok=ok)
