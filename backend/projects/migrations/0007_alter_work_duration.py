# Generated by Django 3.2.10 on 2022-02-06 22:40

import datetime

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0006_auto_20220206_1604"),
    ]

    operations = [
        migrations.AlterField(
            model_name="work",
            name="duration",
            field=models.DurationField(default=datetime.timedelta(0)),
        ),
    ]
