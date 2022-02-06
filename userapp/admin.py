from django.contrib import admin
from userapp.models import UserProfile


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'first_name', 'last_name', 'email', 'created_at')
    list_display_links = ('user_name', 'email')
    search_fields = ('user_name', 'first_name', 'last_name', 'email', 'created_at')


admin.site.register(UserProfile, UserAdmin)
