from django.contrib import admin

from .models import Product, ProductCategory, Shop

admin.site.register(Shop)
admin.site.register(Product)
admin.site.register(ProductCategory)
