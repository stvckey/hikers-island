from flask import Flask, render_template
import os
import json

app = Flask(__name__, static_folder='frontend/build/static', template_folder='frontend/build')

@app.route('/')
def index():
    apiKey = os.getenv('GOOGLE_MAPS_API_KEY')
    # This is just an example of how to pass variables back and forth!
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)