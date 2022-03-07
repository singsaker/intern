from django.db import models


class RoomType(models.Model):
    name = models.CharField(max_length=20)

    class Meta:
        verbose_name_plural = "Room Types"

    def __str__(self) -> str:
        return f"{self.name}"


class Room(models.Model):
    number = models.IntegerField()
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    member = models.OneToOneField(
        "members.Member", on_delete=models.SET_NULL, blank=True, null=True
    )

    def __str__(self) -> str:
        return f"Room {self.number}"


class RoomExchange(models.Model):
    name = models.CharField(max_length=30)
    members = models.ManyToManyField("members.Member")
    current_index = models.IntegerField(default=0)
    active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name}"


class RoomExchangeRecord(models.Model):
    index = models.IntegerField()
    room_exchange = models.ForeignKey(RoomExchange, on_delete=models.CASCADE)
    member = models.ForeignKey("members.Member", on_delete=models.CASCADE)
    old_room = models.ForeignKey(
        Room, on_delete=models.CASCADE, related_name="old_room"
    )
    new_room = models.ForeignKey(
        Room, on_delete=models.CASCADE, blank=True, null=True, related_name="new_room"
    )
