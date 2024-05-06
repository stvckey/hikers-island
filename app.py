from flask import Flask, render_template, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
import os
import json
from config import ApplicationConfig
from models import db, User, Park, Hours, Images, Comment, ParkLike, CommentLike

BUILD_FOLDER = "client"

app = Flask(__name__, static_folder=f'{BUILD_FOLDER}/build/static', template_folder=f'{BUILD_FOLDER}/build')
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()
    
@app.route('/')
def index():
    apiKey = os.getenv('GOOGLE_MAPS_API_KEY')
    # This is just an example of how to pass variables back and forth!
    return render_template('index.html')

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({
            "Error": "Unauthorized"
        }), 401
        
    user = User.query.filter_by(user_id=user_id).first()
    return jsonify({
        "user_id": user.user_id,
        "username": user.username
    })


#Endpoint responsible for signing up new users
@app.route('/register', methods=["POST"])
def register_user():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]
    
    #Providing error codes for unique credentials
    email_exists = User.query.filter_by(email=email).first() is not None
    username_exists = User.query.filter_by(username=username).first() is not None
    
    if username_exists:
        return jsonify({
            "Error": "Username already exists"
        })    
        
    if email_exists:
        return jsonify({
            "Error": "Email already exists"
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
        
    session["user_id"] = user.user_id
    
    return jsonify({
        "id": user.user_id,
        "email": user.email,
        "username": user.username
    })
    
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
    

if __name__ == '__main__':
    app.run(debug=True)