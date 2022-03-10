
from rest_framework import mixins, viewsets
from userapp.models import UserProfile
from userapp.serializers import UserModelSerializer


class UserProfileViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                         mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = UserProfile.objects.all()

