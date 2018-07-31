"""Implement authentication and authorization policy"""
from passlib.totp import generate_secret
from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.interfaces import IAuthenticationPolicy
from pyramid.security import Authenticated, Everyone
from zope.interface import implementer

from .models.user import User
from .models.token import Token


@implementer(IAuthenticationPolicy)
class MyAuthenticationPolicy(CallbackAuthenticationPolicy):

    def unauthenticated_userid(self, request):
        """Returns user's id by token"""
        userid = Token.get_user_id(request)
        if userid is not None:
            return userid

    def authenticated_userid(self, request):
        """Get authenticated user id from user object in request object"""
        user = request.user
        if user is not None:
            return user.id

    def effective_principals(self, request):
        """Return principals for authenticated user"""
        principals = [Everyone]
        user = request.user
        if user is not None:
            principals.append(Authenticated)
            principals.append(str(user.id))
            principals.append('role:' + user.get_role(request))
        return principals

    def remember(self, request, userid, **kw):
        """Generate random authorization token, save it into db and return"""
        key = generate_secret()
        Token.add_token(request, key, userid)
        return key

    def forget(self, request):
        """Delete token from db if it exist"""
        if 'Authorization' in request.headers:
            if Token.deactivate(request,
                                request.headers['Authorization'].split(' ')[1]
                                ):
                return True
        else:
            return False


def get_user(request):
    """Get user object by unauthenticated user id"""
    user_id = request.unauthenticated_userid
    if user_id is not None:
        user = request.dbsession.query(User).get(user_id)
        return user


def includeme(config):
    authn_policy = MyAuthenticationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.add_request_method(get_user, 'user', reify=True)
