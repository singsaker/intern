from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class University(models.Model):
  name = models.CharField(max_length=30, default="")

  def __str__(self):
        return self.name

class Study(models.Model):
  name = models.CharField(max_length=30, default="")

  def __str__(self):
        return self.name

class User(AbstractUser):
  first_name = None
  last_name = None

class Member(models.Model):
  GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
  )

  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
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

  def __str__(self):
        return str(self.first_name) + " " + str(self.last_name)