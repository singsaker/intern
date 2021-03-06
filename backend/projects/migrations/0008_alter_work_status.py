# Generated by Django 3.2.10 on 2022-02-11 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0007_alter_work_duration"),
    ]

    operations = [
        migrations.AlterField(
            model_name="work",
            name="status",
            field=models.IntegerField(
                choices=[(1, "Approved"), (2, "Pending"), (3, "Disapproved"), (4, "Inactive")], default=2
            ),
        ),
    ]
