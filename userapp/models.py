from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile(AbstractUser):
    user_name = models.CharField(max_length=25, verbose_name='Имя пользователя')
    first_name = models.CharField(max_length=25, verbose_name='Имя')
    last_name = models.CharField(max_length=25, verbose_name='Фамилия')
    email = models.EmailField(unique=True, verbose_name='Емейл')
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата регистрации')
