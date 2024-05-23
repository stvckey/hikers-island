from flask import Flask, render_template, current_app, request, jsonify, session
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
    

# current_state = "GA"
    
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
    
@app.route("/all_users")
def get_all_users():

    users = User.query.all()
    return jsonify([{
        "username": user.username
    } for user in users])
    
    
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/all_parks")
def get_all_parks():

    parks = Park.query.all()
    return jsonify([{
        
        "park_id": park.park_id,
        "name": park.name,
        "designation": park.designation,
        "parkCode": park.parkCode,
        "url": park.url,
        "description": park.description,
        "lat": park.lat,
        "long": park.long,
        "activities": park.activities,
        "topics": park.topics,
        "states": park.states,
        "entranceFees": park.entranceFees,
        "directionsInfo": park.directionsInfo,
        "directionsUrl": park.directionsUrl,
        "weatherInfo": park.weatherInfo,
        "relevanceScore": park.relevanceScore,
        "phoneNumber": park.phoneNumber,
        "address": park.address
        
    } for park in parks])

#Getting all park states
@app.route("/all_states")
def get_all_states():
    parks = Park.query.all()
    
    # Using a set to collect unique states
    unique_states = set()
    for park in parks:
        park_states = park.states.split(",")  # Assuming states are comma-separated
        for state in park_states:
            unique_states.add(state.strip())  # Strip any leading/trailing whitespace
    
    return jsonify(list(unique_states))


@app.route("/search_by_state", methods=["GET", "POST"])
def search_by_state():
    # global current_state
    
    current_state = request.json["state"]

    parks = Park.query.filter_by(states=current_state)
    return jsonify([{
        
        "park_id": park.park_id,
        "name": park.name,
        "designation": park.designation,
        "parkCode": park.parkCode,
        "url": park.url,
        "description": park.description,
        "lat": park.lat,
        "long": park.long,
        "activities": park.activities,
        "topics": park.topics,
        "states": park.states,
        "entranceFees": park.entranceFees,
        "directionsInfo": park.directionsInfo,
        "directionsUrl": park.directionsUrl,
        "weatherInfo": park.weatherInfo,
        "relevanceScore": park.relevanceScore,
        "phoneNumber": park.phoneNumber,
        "address": park.address
        
    } for park in parks])




#Database population route

def add_parks():
    with open('park_data.json', 'r') as json_file:
        park_data = json.load(json_file)

    with current_app.app_context():
        for x in park_data:
            # Check if lat and long are valid numbers
            if x["lat"] is not None and x["long"] is not None:
                new_park = Park(
                    lat=x["lat"], long=x["long"], url=x["url"],
                    activities=str(x["activities"]), description=x["description"],states=x["states"][:2], 
                    parkCode=x["parkCode"], topics=str(x["topics"]), directionsInfo=x["directionsInfo"],
                    directionsUrl=x["directionsUrl"], weatherInfo=x["weatherInfo"], designation=x["designation"],
                    relevanceScore=x["relevanceScore"], entranceFees=x["entranceFees"], name=x["name"],
                    address=x["address"], phoneNumber=str(x["phoneNumber"])
                )
                db.session.add(new_park)
            else:
                print(f"Ignoring park with missing latitude/longitude data: {x['name']}")

        db.session.commit()


@app.route("/initialize_database", methods=["GET"])
def initialize_database():
    add_parks()
    return "Database initialized successfully!"



if __name__ == '__main__':
    app.run(debug=True)