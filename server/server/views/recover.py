import random
import transaction
from cornice import Service
from passlib.totp import generate_secret
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from passlib.hash import pbkdf2_sha256
from passlib.totp import generate_secret
from server.models.user_status import UserStatus
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound

from ..models.user import User
from server.models.user_status import UserStatus


recover_password = Service(name='recover_password', path='/recover-password')
change_password = Service(name='change_password', path='/change-password/{change_password_hash}')


@recover_password.post()
def recover_send_mail(request):
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    if (user.email is not None) and user.is_active(request):
        url_token_confirmation = generate_secret()
        user.url_token = url_token_confirmation
        mailer = request.mailer
        message = Message(subject="Recover password",
                          sender="eventmerv@gmail.com",
                          recipients=[json["email"]],
                          body='Follow the link below' + '\n' + request.route_url('change_password',
                                                                                  change_password_hash=url_token_confirmation))
        mailer.send_immediately(message, fail_silently=False)

    return {
        'msg': "We send link for change password in your mail "+ json['email'],
        'success': True
    }


@change_password.post()
def recover_change_password(request):
    json = request.json_body
    user_change_password = request.matchdict['change_password_hash']
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    if user.email is not None and user.url_token == user_change_password:
        user.password=pbkdf2_sha256.hash(json['password'])
        user.url_token = None
    return {'status': 'OK'}
