from django.db import models
from userapp.models import UserProfile


class Project(models.Model):
    project_name = models.CharField(max_length=50, unique=True, verbose_name='Название проекта')
    users = models.ManyToManyField(UserProfile, verbose_name='Пользователи')
    repository_link = models.URLField(blank=True, verbose_name='Ссылка на репозиторий')

    def __str__(self):
        return self.project_name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT, verbose_name='Проект')
    content_creator = models.ForeignKey(UserProfile, on_delete=models.PROTECT, verbose_name='Создатель')
    description = models.TextField(verbose_name='Описание проекта')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Последнее обновление')
    is_active = models.BooleanField(default=True, verbose_name='Пользователь активирован')

    def __str__(self):
        return f'{self.project} - {self.description}'
