# # myapp/signals.py

# from django.core.mail import send_mail
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import *

# @receiver(post_save, sender=Book)
# def send_email_on_customer_creation(sender, instance, created, **kwargs):
#     if created:
#         subject = 'Welcome to Our Service'
#         message = f'Hello, thank you for signing up!'
#         from_email = 'ayrash283@gmail.com'
#         recipient_list = ['ayrash283@gmail.com']
        
#     send_mail(subject, message, from_email, recipient_list)
