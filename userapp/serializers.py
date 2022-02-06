from rest_framework.serializers import ModelSerializer
from userapp.models import UserProfile


class UserModelSerializer(ModelSerializer):

    class Meta:
        model = UserProfile
        # fields = '__all__'
        fields = ('username', 'first_name', 'last_name', 'email', 'created_at')
