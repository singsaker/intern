from django.db import models
from members.models import Member


# Create your models here.
class Shop(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.CharField(max_length=4000, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"


class ProductCategory(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True, null=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="product_categories")

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        verbose_name_plural = "Product Categories"


class Product(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField(blank=True, null=True)
    product_categories = models.ManyToManyField(ProductCategory, blank=True, related_name="products")
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="products")

    def __str__(self) -> str:
        return f"[{str(self.shop)}] {self.name}"

    # Må legge til bilde/farge


class Sale(models.Model):
    date = models.DateTimeField()
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="sales")
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="sales")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="sales")
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
