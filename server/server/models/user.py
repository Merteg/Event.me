"""SQLAlchemy model for table users"""
from datetime import datetime

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from . import Base
from .user_status import UserStatus


class User(Base):
    """SQLAlchemy model for table users"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    nickname = Column(String, unique=True)
    password = Column(String)
    create_date = Column(DateTime)
    location = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    status_id = Column(Integer, ForeignKey("user_statuses.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    avatar = Column(String)
    banned_to_date = Column(DateTime)

    tokens = relationship("Token")
    roles = relationship("Role", foreign_keys=(role_id,))
    user_statuses = relationship("UserStatus", foreign_keys=(status_id,))
    events = relationship("Event")
    feedback = relationship("Feedback")
    users_subscribe = relationship("Subscribe")

    @classmethod
    def get_one(cls, request, **kwargs):
        """Get one user from db by params

        Return user object if user exist and return None if not
        Arguments:
        request -- request object that provides from view
        **kwargs -- parameters for searching user
        (e.g. field=value, field=value)
        """
        user = request.dbsession.query(cls).filter_by(**kwargs).one_or_none()
        return user

    def check_password(self, password):
        """Check if user password valid"""
        return pbkdf2_sha256.verify(password, self.password)

    def is_active(self, request):
        """Check is user active

        Change user status to active if user was banned but time of his
        ban ended. Return True if user active and return False if not.
        Arguments:
        request -- request object that provides from view
        """
        user_status = request.dbsession.query(UserStatus)\
            .filter_by(id=self.status_id).one()
        if user_status.status == "Active":
            return True
        elif user_status.status == "Banned":
            if self.banned_to_date < datetime.now():
                self.status_id = request.dbsession.query(UserStatus)\
                                .filter_by(status="Active").one().id
                return True
        return False