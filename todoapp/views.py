from rest_framework.viewsets import ModelViewSet
from todoapp.serializers import ProjectModelSerializer, ToDoModelSerializer
from todoapp.models import Project, ToDo


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = ToDo.objects.filter(is_active=True)
