from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile(AbstractUser):
    email = models.EmailField(unique=True, verbose_name='Емейл')
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата регистрации')
