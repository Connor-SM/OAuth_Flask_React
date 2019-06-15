from app import app, db
from flask import redirect, url_for, request, jsonify
from app.models import User
import time
import jwt


@app.route('/')
@app.route('/index')
def index():
    return ''


@app.route('/api/register', methods=['GET', 'POST'])
def register():
    try:
        token = request.headers.get('token')

        print(token)

        # decode the token back to a dictionary
        data = jwt.decode(
            token,
            app.config['SECRET_KEY'],
            algorithm=['HS256']
        )

        print(data)

        # create the user and save
        user = User(email=data['email'])
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        return jsonify({ 'message': 'success' })
    except:
        return jsonify({ 'message': 'Error #001: User not created' })


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    try:
        token = request.headers.get('token')

        print(token)

        # decode the token back to a dictionary
        data = jwt.decode(
            token,
            app.config['SECRET_KEY'],
            algorithm=['HS256']
        )

        print(data)

        # query db to get user and check pass
        user = User.query.filter_by(email=data['email']).first()

        # if user doesn't exist or password incorrect, send fail msg
        if user is None or not user.check_password(data['password']):
            return jsonify({ 'message': 'Error #002: Invalid credentials' })

        # create a token and return it
        return jsonify({ 'message': 'success', 'token': user.get_token() })
    except:
        return jsonify({ 'message': 'Error #003: Failure to login' })


@app.route('/api/data', methods=['GET', 'POST'])
def data():
    try:
        token = request.headers.get('token')

        # get user id or none
        user = User.verify_token(token)

        if not user:
            return jsonify({ 'message': 'Error #004: Invalid user' })

        data = {
            'name': 'John Smith',
            'age': 27
        }

        return jsonify({ 'info': data })
    except:
        return jsonify({ 'message': 'Error #005: Invalid token' })
