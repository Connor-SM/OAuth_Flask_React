from app import db, login, app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from time import time
import jwt


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_token(self, expires_in=86400):
        return jwt.encode(
            { 'user_id': self.id, 'exp': time() + expires_in },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        ).decode('utf-8')

    @staticmethod
    def verify_token(token):
        try:
            id = jwt.decode(
                token,
                app.config['SECRET_KEY'],
                algorithm=['HS256']
            )['user_id']
        except:
            return

        return User.query.get(id)

    def __repr__(self):
        return '<User {}>'.format(self.email)
