from rest_framework.viewsets import ModelViewSet
from userapp.models import UserProfile
from userapp.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserModelSerializer
