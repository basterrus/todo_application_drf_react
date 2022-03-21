import graphene
from django.db.models import Q
from django.shortcuts import get_object_or_404
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from userapp.models import UserProfile


class UserType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, self, info, id, first_name, last_name, email):
        user = UserProfile.objects.get(pk=id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, first_name, last_name, email):
        new_user = UserProfile(username=username,
                               first_name=first_name,
                               last_name=last_name,
                               email=email)
        new_user.save()
        return UserCreateMutation(user=new_user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(cls, root, id):
        del_user = UserProfile.objects.get(id=id).delete()
        return UserDeleteMutation(user=None)


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    users_by_name = graphene.List(UserType, name=graphene.String())
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_name = graphene.List(ProjectType, name=graphene.String())
    todos_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    todos_by_body = graphene.List(ToDoType, description=graphene.String())
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)

    def resolve_all_users(self, info):
        return UserProfile.objects.all()

    def resolve_user_by_id(self, info, id):
        return get_object_or_404(UserProfile, pk=id)

    def resolve_users_by_name(self, info, name=''):
        return UserProfile.objects.filter(Q(first_name__contains=name) | Q(last_name__contains=name))

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        return get_object_or_404(Project, pk=id)

    def resolve_projects_by_name(self, info, name=''):
        return Project.objects.filter(project_name__contains=name)

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_todos_by_id(self, info, id):
        return get_object_or_404(ToDo, pk=id)

    def resolve_todos_by_body(self, info, body=''):
        return ToDo.objects.filter(description__contains=body)


class Mutation(graphene.ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
