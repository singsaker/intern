from .models import Shop


class ShopResolvers:
    def resolve_all_shops(self, info):
        return Shop.objects.all()

    def resolve_shop(self, info, slug):
        try:
            return Shop.objects.get(slug=slug)
        except Shop.DoesNotExist:
            return None
