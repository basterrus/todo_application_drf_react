from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from userapp.views import UserModelViewSet


router = DefaultRouter()
router.register('users', UserModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include(router.urls))
]
