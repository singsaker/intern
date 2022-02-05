from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator

class University(models.Model):
  name = models.CharField(max_length=30, default="")

  def __str__(self):
        return self.name
  
  class Meta:
    verbose_name_plural = "Universities"

class Study(models.Model):
  name = models.CharField(max_length=30, default="")

  def __str__(self):
        return self.name

  class Meta:
    verbose_name_plural = "Studies"

class User(AbstractUser):
  first_name = None
  last_name = None


class Member(models.Model):
  GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
  )

  user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name="member")
  first_name = models.CharField(max_length=50, blank=True, null=True)
  last_name = models.CharField(max_length=50, blank=True, null=True)
  gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default="")
  birth_date = models.DateField(blank=True, null=True)
  phone = models.IntegerField(blank=True, null=True)

  # Address
  street = models.CharField(max_length=20, default="", blank=True, null=True)
  city = models.CharField(max_length=20, default="", blank=True, null=True)
  province = models.CharField(max_length=50, default="", blank=True, null=True)
  zipcode = models.CharField(max_length=5, default="", blank=True, null=True)

  # Study details
  university = models.ForeignKey(University, on_delete=models.SET_NULL, blank=True, null=True)
  study = models.ForeignKey(Study, on_delete=models.SET_NULL, blank=True, null=True)
  grade = models.IntegerField(default=1, validators=[MaxValueValidator(6), MinValueValidator(1)])

  class Meta:
    unique_together = [['first_name', 'last_name']]

  def __str__(self):
    return f"{self.first_name} {self.last_name}"