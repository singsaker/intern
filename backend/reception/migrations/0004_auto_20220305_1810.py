# Generated by Django 3.2.10 on 2022-03-05 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("reception", "0003_alter_shift_shift_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shiftdate",
            name="date",
            field=models.DateField(unique=True),
        ),
        migrations.AlterUniqueTogether(
            name="shift",
            unique_together={("shift_date", "shift_type")},
        ),
    ]
