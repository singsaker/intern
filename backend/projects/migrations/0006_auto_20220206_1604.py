# Generated by Django 3.2.10 on 2022-02-06 16:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0003_auto_20220118_2222"),
        ("projects", "0005_auto_20220206_1553"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="members",
            field=models.ManyToManyField(
                blank=True, related_name="projects", through="projects.ProjectMember", to="members.Member"
            ),
        ),
        migrations.AlterField(
            model_name="projectmember",
            name="member",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="members.member"),
        ),
        migrations.AlterField(
            model_name="projectmember",
            name="project",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="projects.project"),
        ),
    ]
