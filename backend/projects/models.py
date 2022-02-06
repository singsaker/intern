from datetime import timedelta
from email.policy import default
from django.db import models
from members.models import Member

class ProjectCategory(models.Model):
  name = models.CharField(max_length=20)

  def __str__(self) -> str:
    return self.name
  
  class Meta:
    verbose_name_plural = "Project Categories"


class Project(models.Model):
  name = models.CharField(max_length=30)
  hours = models.IntegerField(default=2964)
  description = models.TextField(blank=True, null=True)
  project_category = models.ForeignKey(ProjectCategory, on_delete=models.CASCADE)
  start_date = models.DateField(blank=True, null=True)
  end_date = models.DateField(blank=True, null=True)
  members = models.ManyToManyField(Member, related_name="projects", through="ProjectMember", blank=True)
  parent_project = models.ForeignKey('self', blank=True, null=True, related_name='child_project', on_delete=models.CASCADE)

  def __str__(self) -> str:
    return self.name

  # Gjenstående timer per pers
  # Hver bruker får tilegnet en gitt mengde timer på prosjekt


class ProjectMember(models.Model):
  member = models.ForeignKey(Member, on_delete=models.CASCADE, )
  project = models.ForeignKey(Project, on_delete=models.CASCADE, )
  allocated_time = models.IntegerField(default=0)

  def __str__(self) -> str:
    return f"{self.member} deltar i {self.project}"

class WorkCategory(models.Model):
  name = models.CharField(max_length=20)

  def __str__(self) -> str:
    return self.name

  class Meta:
    verbose_name_plural = "Work Categories"

class Work(models.Model):
  class Status(models.IntegerChoices):
        APPROVED = 1
        PENDING = 2
        DISAPPROVED = 3

  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  task_category = models.ForeignKey(WorkCategory, on_delete=models.CASCADE)
  member = models.ForeignKey(Member, on_delete=models.CASCADE)

  description = models.TextField(blank=True, null=True)
  duration = models.DurationField(default=timedelta(0))
  execution_date = models.DateField(blank=True, null=True)
  register_date = models.DateField(blank=True, null=True)
  status = models.IntegerField(choices=Status.choices, default=Status.PENDING)

  def __str__(self) -> str:
    return str(self.member) + ": " + str(self.task_category)

  class Meta:
    verbose_name_plural = "Work"




# class Task(models.Model): -> Dersom det blir aktuelt å lyse ut oppgaver på internsiden