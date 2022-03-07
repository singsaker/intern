from .models import Member, User


class MemberResolvers:
    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_members(self, info):
        return Member.objects.all()

    def resolve_all_active_members(self, info):

        return Member.objects.filter(active=True)

    def resolve_member(self, info, id=None):
        try:
            if id:
                return Member.objects.get(id=id)
        except Member.DoesNotExist:
            return None

    def resolve_user_details(root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        return User.objects.get(username=user)
