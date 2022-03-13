from rest_framework import mixins, viewsets
from userapp.models import UserProfile
from userapp.serializers import UserModelSerializer, UserModelSerializerVersion2


class UserProfileViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                         mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = UserProfile.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerVersion2
        return UserModelSerializer
