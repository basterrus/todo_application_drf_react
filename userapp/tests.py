from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from userapp.models import UserProfile
from userapp.views import UserProfileViewSet


class TestUsersApplicationAPIRequestFactory(TestCase):
    """Тест кейс с использованием APIRequestFactory и force_authenticate"""

    def setUp(self) -> None:
        self.new_user = {'username': 'user1999', 'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'ivan@ivanov.ru'}
        self.admin = UserProfile.objects.create_superuser("admin", "admin@domain.com", "admin")

    def test_get_list_users(self):
        """Тест проверяет доступность указанного адреса"""

        factory = APIRequestFactory()
        request = factory.get('/api/v1/users/1/')
        users_view = UserProfileViewSet.as_view({'get': 'list'})
        response = users_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_non_authenticate_users(self):
        """Тест проверяет возможность создания записей от имени не авторизованного пользователя"""

        factory = APIRequestFactory()
        request = factory.post('/api/v1/users/')
        users_view = UserProfileViewSet.as_view({'post': 'create'})
        response = users_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_users_from_admins_role(self):
        """Тест проверяет возможность создания пользователя от имени администратора"""

        factory = APIRequestFactory()
        request = factory.post('/api/v1/users/', self.new_user, format='json')
        force_authenticate(request, self.admin)
        users_view = UserProfileViewSet.as_view({'post': 'create'})
        response = users_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_forced_CSRF_check(self):
        """Тест принудительной проверки CSRF"""
        factory = APIRequestFactory(enforce_csrf_checks=True)

    def tearDown(self) -> None:
        pass


class TestUsersApplicationAPIClient(TestCase):
    """Тест кейс с использованием APIClient"""

    def setUp(self) -> None:
        self.new_user = {'username': 'user1999', 'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'ivan@ivanov.ru'}
        self.admin = UserProfile.objects.create_superuser("admin", "admin@domain.com", "admin")

    def test_get_detail_info(self):
        """Тест проверки доступности страницы с детальной информацией """
        user = UserProfile.objects.create(username='user1999', first_name='Ivan', last_name='Ivanov', email='ivan'
                                                                                                            '@ivanov.ru')
        client = APIClient()
        request = client.get(f'/api/v1/users/{user.id}/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_delete_item_non_autenticate(self):
        """Тест проверки возможности удаления данных неавторизованным пользователем """

        user = UserProfile.objects.create(username='user1999', first_name='Ivan', last_name='Ivanov', email='ivan'
                                                                                                            '@ivanov.ru')
        client = APIClient()
        request = client.delete(f'/api/v1/users/{user.id}/')
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_item_autenticate_user(self):
        """Тест проверки возможности удаления данных авторизованным пользователем """

        user = UserProfile.objects.create(username='user1999', first_name='Ivan', last_name='Ivanov', email='ivan'
                                                                                                            '@ivanov.ru')
        client = APIClient()
        client.login(username='admin', password='admin')
        request = client.delete(f'/api/v1/users/{user.id}/')
        self.assertEqual(request.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)  # Метод не заложен во view, поэтому 405
        client.logout()

    def test_update_item_autenticate_user(self):
        """Тест проверки возможности обновления данных авторизованным пользователем """

        user = UserProfile.objects.create(username='user1999', first_name='Ivan', last_name='Ivanov', email='ivan'
                                                                                                            '@ivanov.ru')
        client = APIClient()
        client.login(username='admin', password='admin')
        request = client.delete(f'/api/v1/users/{user.id}/')
        self.assertEqual(request.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)  # Метод не заложен во view, поэтому 405
        client.logout()

    def test_forced_CSRF_check(self):
        """Тест принудительной проверки CSRF"""
        factory = APIClient(enforce_csrf_checks=True)

    def tearDown(self) -> None:
        pass

#
# if __name__ == '__main__':
#     # Тест кейсы с использованием APIRequestFactory
#     test = TestUsersApplicationAPIRequestFactory()
#     test.test_get_list_users()
#     test.test_create_non_authenticate_users()
#     test.test_create_users_from_admins_role()
#     test.test_forced_CSRF_check()
#
#     # Тест кейсы с использованием APIClient
#     test1 = TestUsersApplicationAPIClient()
#     test1.test_get_detail_info()
#     test1.test_delete_item_non_autenticate()
#     test1.test_delete_item_autenticate_user()
#     test1.test_forced_CSRF_check()
