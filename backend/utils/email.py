from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template
from members.models import User


def email(user):
    subject = "Internsida: Du skal snart sitte vakt"
    message = get_template("email_template.html").render({"user": user})
    recipient_list = [
        "mathias.skra@hotmail.com",
    ]

    send_mail(
        subject=subject,
        html_message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=recipient_list,
        message=subject,
    )
