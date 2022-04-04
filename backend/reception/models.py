from datetime import date

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Semester(models.Model):
    FALL = "FALL"
    SPRING = "SPRING"

    CODE_CHOICES = ((FALL, "Høst"), (SPRING, "Vår"))

    year = models.IntegerField(default=date.today().year)
    code = models.CharField(max_length=9, choices=CODE_CHOICES)

    def __str__(self) -> str:
        return f"{self.year} {self.code}"


class ShiftDate(models.Model):
    date = models.DateField(unique=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.date)


class Shift(models.Model):
    shift_type = models.IntegerField(
        default=1, validators=[MaxValueValidator(4), MinValueValidator(1)]
    )
    member = models.ForeignKey(
        "members.Member", on_delete=models.CASCADE, null=True, blank=True
    )
    shift_date = models.ForeignKey(
        ShiftDate, on_delete=models.CASCADE, related_name="shifts"
    )

    class Meta:
        unique_together = [["shift_date", "shift_type"]]

    def __str__(self) -> str:
        return f"{self.shift_type} {self.member}"


# Må finne løsning på vaktbytte
