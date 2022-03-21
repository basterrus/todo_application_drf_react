from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from userapp.models import UserProfile


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class UserModelSerializerVersion2(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')


class UserUpdateModelSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'email']
