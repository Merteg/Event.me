"""SQLAlchemy model for table tokens"""
from datetime import datetime, timedelta

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from . import Base


TOKEN_LIFETIME = 7


class Token(Base):
    __tablename__ = "tokens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String, unique=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    expiration_date = Column(DateTime)

    user = relationship("User", foreign_keys=(user_id,))

    @classmethod
    def add_token(cls, request, token, user_id):
        """Add authorization token to the db"""
        token_obj = cls(token=token, user_id=user_id,
                        expiration_date=datetime.now() +
                        timedelta(days=TOKEN_LIFETIME))
        request.dbsession.add(token_obj)

    @classmethod
    def deactivate(cls, request, token):
        """Delete authorization token from db"""
        request.dbsession.query(cls).filter_by(token=token).delete()
        return True