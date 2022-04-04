from django.contrib import admin

from .models import Room, RoomExchange, RoomExchangeRecord, RoomType

admin.site.register(Room)
admin.site.register(RoomType)
admin.site.register(RoomExchange)
admin.site.register(RoomExchangeRecord)
