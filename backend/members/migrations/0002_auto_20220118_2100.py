# Generated by Django 3.2.10 on 2022-01-18 21:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="study",
            options={"verbose_name_plural": "Studies"},
        ),
        migrations.AlterModelOptions(
            name="university",
            options={"verbose_name_plural": "Universities"},
        ),
        migrations.AlterField(
            model_name="member",
            name="user",
            field=models.OneToOneField(
                blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
