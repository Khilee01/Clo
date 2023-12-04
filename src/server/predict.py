import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
cors = CORS(app, resources={r"/predict": {"origins": ["*"]}})

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/predict", methods=["POST"])
def receive_data():
    # Extract data from the request
    data = request.get_json()
    print(data)

    favorite_color = data.get('favColor')
    skin_tone = data.get('skinTone')
    interest_style = data.get('interestStyle')

    # Predict the colors
    # Prepare the response data
    response_data = {
        'primary_color': primary_color,
        'secondary_color': secondary_color
    }

    # Return the response in JSON format
    response = jsonify(response_data)
    response.headers['Access-Control-Allow-Origin'] = '*'

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
