# Generated by Django 3.2.10 on 2022-02-11 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0005_auto_20220211_1206'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
