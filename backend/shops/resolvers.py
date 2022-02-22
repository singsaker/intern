from .models import Shop


class ShopResolvers:
    def resolve_all_shops(self, info):
        return Shop.objects.all()

    def resolve_shop(self, info, id):
        try:
            return Shop.objects.get(id=id)
        except Shop.DoesNotExist:
            return None
