from .models import Sale, Shop


class ShopResolvers:
    def resolve_all_shops(self, info):
        return Shop.objects.all()

    def resolve_shop(self, info, slug):
        try:
            return Shop.objects.get(slug=slug)
        except Shop.DoesNotExist:
            return None

    def resolve_all_sales(self, info, shop, member=None):
        if member:
            return Sale.objects.filter(shop=shop, member=member)

        return Sale.objects.filter(shop=shop)
