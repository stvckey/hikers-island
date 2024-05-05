from flask import Flask, render_template, request, jsonify
from flask_bcrypt import Bcrypt
import os
import json
from config import ApplicationConfig
from models import db, User, Park, Hours, Images, Comment, ParkLike, CommentLike

BUILD_FOLDER = "client"

app = Flask(__name__, static_folder=f'{BUILD_FOLDER}/build/static', template_folder=f'{BUILD_FOLDER}/build')
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    apiKey = os.getenv('GOOGLE_MAPS_API_KEY')
    # This is just an example of how to pass variables back and forth!
    return render_template('index.html')

#Endpoint responsible for signing up new users
@app.route('/register', methods=["POST"])
def register_user():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]
    
    user_exists = User.query.filter_by(email=email).first() is not None
    
    if user_exists:
        return jsonify({
            "Error": "User already exists"
        })    
        
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.user_id,
        "email": new_user.email,
        "username": new_user.username
    })
    
@app.route('/login', methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({
            "Error": "Unauthorized"
        }), 401
        
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "Error": "Unauthorized"
        }), 401
        
    return jsonify({
        "id": user.user_id,
        "email": user.email,
        "username": user.username
    })
    

if __name__ == '__main__':
    app.run(debug=True)