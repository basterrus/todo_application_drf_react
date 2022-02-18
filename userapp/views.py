# from django.http import Http404
from rest_framework import status, mixins, viewsets
# # from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
# from rest_framework.pagination import PageNumberPagination
# from rest_framework.renderers import JSONRenderer
# from rest_framework.response import Response
# from rest_framework.views import APIView
from userapp.models import UserProfile
from userapp.serializers import UserModelSerializer, UserUpdateModelSerializer


class UserProfileViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = UserProfile.objects.all()

# class UserListModelView(APIView):
#     """ Контроллер вывода списка пользователей """
#
#     def get(self, request, format=None):
#         user = UserProfile.objects.all()
#         serializer = UserModelSerializer(user, many=True)
#         return Response(serializer.data)
#
#
# class UserDetailModelView(APIView):
#     """ Контроллер вывода детальной информации о пользователе"""
#
#     def get_object(self, pk):
#         try:
#             return UserProfile.objects.get(pk=pk)
#         except UserProfile.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk):
#         user = self.get_object(pk)
#         serializer = UserModelSerializer(user)
#         return Response(serializer.data)
#
#
# class UserUpdateModelView(APIView):
#
#     def get_object(self, pk):
#         try:
#             return UserProfile.objects.get(pk=pk)
#         except UserProfile.DoesNotExist:
#             raise Http404
#
#     def put(self, request, pk):
#         instance = self.get_object(pk)
#         serializer = UserUpdateModelSerializer(instance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
