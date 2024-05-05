from flask import Flask, render_template
import os
import json
from config import ApplicationConfig
from models import db, User, Park, Hours, Images, Comment, ParkLike, CommentLike

BUILD_FOLDER = "client"

app = Flask(__name__, static_folder=f'{BUILD_FOLDER}/build/static', template_folder=f'{BUILD_FOLDER}/build')
app.config.from_object(ApplicationConfig)

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    apiKey = os.getenv('GOOGLE_MAPS_API_KEY')
    # This is just an example of how to pass variables back and forth!
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)