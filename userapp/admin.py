from django.contrib import admin
from userapp.models import UserProfile


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'created_at')
    list_display_links = ('username', 'email')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'created_at')


admin.site.register(UserProfile, UserAdmin)
