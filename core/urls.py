from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include

from userapp.views import UserProfileViewSet
from todoapp.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register('users', UserProfileViewSet)
router.register('todos', ToDoViewSet)
router.register('projects', ProjectViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include(router.urls)),
]