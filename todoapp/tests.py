from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from userapp.models import UserProfile
from todoapp.models import ToDo, Project


class TestUsersApplicationAPIRequestFactory(APITestCase):
    """Тест кейс с использованием APITestCase и mixer"""

    def setUp(self) -> None:
        self.admin = UserProfile.objects.create_superuser("admin", "admin@domain.com", "admin")
        self.data = {'project_name': 'project 9999',
                     'repository_link': 'https://hernandez.com/',
                     'users': [self.admin.id]}
        self.user_data = {'first_name': 'user 9999',
                          'email': 'user9999@usr9999.ru'}

    def test_get_list_of_projects(self):
        response = self.client.get('/api/v1/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_todo_mixer(self):
        todo = mixer.blend(ToDo)
        project = mixer.blend(Project)
        self.client.login(username='admin', password='admin')
        response = self.client.patch(f'/api/v1/todos/{todo.id}/', {'project_name': todo.project.id,
                                                                   'description': 'bla bla bla',
                                                                   'content_creator': project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(new_todo.description, 'bla bla bla')
        self.client.logout()

    def tearDown(self) -> None:
        pass