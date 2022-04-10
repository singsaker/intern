# Generated by Django 3.2.10 on 2022-03-05 13:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("reception", "0002_auto_20220305_1328"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shift",
            name="shift_date",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="shifts", to="reception.shiftdate"
            ),
        ),
    ]
