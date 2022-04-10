from django.contrib import admin

from .models import Product, ProductCategory, Sale, Shop

admin.site.register(Shop)
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(Sale)
