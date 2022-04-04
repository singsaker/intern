from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from reception.models import Semester


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


# Regitimer / vakter
class Role(models.Model):
    ONLY_RECEPTION = "FULL_RECEPTION"
    ONLY_WORK = "FULL_WORK"
    HYBRID = "HYBRID"
    KEY_PERSON = "ADMIN"

    TYPE_CHOICES = (
        (ONLY_RECEPTION, "Full vakt"),
        (ONLY_WORK, "Full regi"),
        (HYBRID, "Hybrid"),
        (KEY_PERSON, "Utvalget"),
    )

    type = models.CharField(max_length=30, choices=TYPE_CHOICES, default=HYBRID)

    def shift_number(self, semester_code):
        if semester_code == Semester.FALL:
            if self.type == self.ONLY_RECEPTION:
                return 8
            elif self.type == self.HYBRID:
                return 5
            else:
                return 0
        if semester_code == Semester.SPRING:
            if self.type == self.ONLY_RECEPTION:
                return 9
            elif self.type == self.HYBRID:
                return 6
            else:
                return 0

    def work_hours(self):
        if self.type == self.ONLY_WORK:
            return 48
        elif self.type == self.HYBRID:
            return 18
        else:
            return 0

    def __str__(self) -> str:
        return f"{self.type}"


class Member(models.Model):
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name="member")
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default="M")
    birth_date = models.DateField(blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)  # Antall regitimer / vakter
    active = models.BooleanField(default=True)  # Beboer bor på sing

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
        unique_together = [["first_name", "last_name"]]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
