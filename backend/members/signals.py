from django.db.models.signals import post_save
from django.dispatch import receiver

from members import models

# Hook the create_user_profile and save_user_profile methods to the User model, whenever a save event occurs


@receiver(post_save, sender=models.User)
def create_member(sender, instance, created, **kwargs):
    if created:
        models.Member.objects.create(user=instance)


@receiver(post_save, sender=models.User)
def save_member(sender, instance, **kwargs):
    instance.member.first_name = instance.first_name
    instance.member.last_name = instance.last_name
    instance.member.save()
