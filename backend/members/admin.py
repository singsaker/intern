from django.contrib import admin
from .models import Member, Study, University, User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    search_fields = ["username", "email"]
    list_display = ("username", "email", "last_login")

admin.site.register(Member)
admin.site.register(University)
admin.site.register(Study)


