from tkinter import N
from django.db import models

from members.models import Member
from django.core.validators import MaxValueValidator, MinValueValidator

class Shift(models.Model):
  shift_type = models.IntegerField(default=1, validators=[MaxValueValidator(4), MinValueValidator(1)])
  member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True, blank=True)
  date = models.DateField(unique=True)

# Må finne løsning på vaktbytte