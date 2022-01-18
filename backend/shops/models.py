from turtle import onclick
from django.db import models

from members.models import Member

# Create your models here.
class Shop(models.Model):
  name = models.CharField(max_length=100)
  slug = models.SlugField(max_length=100)
  description = models.CharField(max_length=4000, blank=True)

  def __str__(self) -> str:
      return f"{self.name}"

class ProductCategory(models.Model):
  name = models.CharField(max_length=30)
  description = models.TextField(blank=True, null=True)

  def __str__(self) -> str:
      return f"{self.name}"

  class Meta:
        verbose_name_plural = "Product Categories"

class Product(models.Model):
  name = models.CharField(max_length=40)
  description = models.TextField(blank=True, null=True)
  price = models.DecimalField(max_digits=6, decimal_places=2)
  quantity = models.PositiveIntegerField(blank=True, null=True)
  product_category = models.ManyToManyField(ProductCategory, blank=True)
  shop = models.ForeignKey(Shop, on_delete=models.CASCADE)

  def __str__(self) -> str:
      return f"[{str(self.shop)}] {self.name}"

  # Må legge til bilde/farge