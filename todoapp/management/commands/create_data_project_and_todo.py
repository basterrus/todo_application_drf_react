from mixer.backend.django import mixer
from django.core.management.base import BaseCommand
from todoapp.models import Project, ToDo


class Command(BaseCommand):

    def handle(self, *args, **options):
        for item in range(5):
            mixer.blend(Project)
            mixer.blend(ToDo)
        print('Создано!')
