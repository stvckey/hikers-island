from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

#Not quite sure how to resolve this issue yet
"""
def get_uuid():
    return uuid4().hex()
"""

#Defining user table
class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    

#Defining park table.. it's a doozie!
class Park(db.Model):
    __tablename__ = "parks"
    park_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.Text, unique=True)
    parkCode = db.Column(db.String(4), unique=True, nullable=False)
    description = db.Column(db.Text)
    lat = db.Column(db.Float(10), nullable=False)
    long = db.Column(db.Float(10), nullable=False)
    activities = db.Column(db.Text)
    topics = db.Column(db.Text)
    states = db.Column(db.String(2), nullable=False)
    entranceFees = db.Column(db.String(5), nullable=False)
    directionsInfo = db.Column(db.Text)
    directionsUrl = db.Column(db.Text)
    weatherInfo = db.Column(db.Text)
    name = db.Column(db.String(255))
    designation = db.Column(db.String(255))
    relevanceScore = db.Column(db.Float(2))
    phoneNumber = db.Column(db.VARCHAR(20))
    address = db.Column(db.Text)
    

#Defining the operating hours table
class Hours(db.Model):
    __tablename__ = "hours"
    hour_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    day = db.Column(db.String(20), nullable=False)
    open_time = db.Column(db.String(10))
    close_time = db.Column(db.String(10))
    
    park_id = db.Column(db.ForeignKey("parks.park_id"))
    

#Defining the images table    
class Images(db.Model):
    __tablename__ = "images"
    image_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    credit = db.Column(db.Text)
    altText = db.Column(db.Text)
    caption = db.Column(db.Text)
    url = db.Column(db.Text)
    
    park_id = db.Column(db.ForeignKey("parks.park_id"))    
    
#Defining comments table
class Comment(db.Model):
    __tablename__ = "comments"
    comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comment_text =  db.Column(db.Text, nullable=False)
    
    user_id = db.Column(db.ForeignKey("users.user_id"))
    park_id = db.Column(db.ForeignKey("parks.park_id"))
    

#Defining the park likes table
class ParkLike(db.Model):
    __tablename__ = "park_likes"
    parkLike_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    user_id = db.Column(db.ForeignKey("users.user_id"))
    park_id = db.Column(db.ForeignKey("parks.park_id"))
    

#Defining the comment likes table
class CommentLike(db.Model):
    __tablename__ = "comment_likes"
    commentLike_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    user_id = db.Column(db.ForeignKey("users.user_id"))
    comment_id = db.Column(db.ForeignKey("comments.comment_id"))
    
    
