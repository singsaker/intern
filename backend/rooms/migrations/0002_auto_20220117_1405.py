# Generated by Django 3.2.10 on 2022-01-17 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='RoomCategory',
            new_name='RoomType',
        ),
        migrations.AlterModelOptions(
            name='roomtype',
            options={'verbose_name_plural': 'Room Types'},
        ),
        migrations.RenameField(
            model_name='room',
            old_name='room_category',
            new_name='room_type',
        ),
    ]
