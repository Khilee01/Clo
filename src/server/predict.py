import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:3001"]}})

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/predict", methods=["POST"])
def receive_data():
    # Extract data from the request
    data = request.get_json()
    print(data)

    favorite_color = data.get("favColor")
    skin_tone = data.get("skinTone")
    interest_style = data.get("interestStyle")

    X = []

    match favorite_color:
        case "Orange":
            X.extend([255, 165, 0])
        case "Green":
            X.extend([0, 255, 0])
        case "Red":
            X.extend([255, 0, 0])
        case "Blue":
            X.extend([0, 0, 255])
        case "Black":
            X.extend([0, 0, 0])
        case "White":
            X.extend([255, 255, 255])

    print("After assigning Favourite Colour")
    print(X)
    match skin_tone:
        case "Light Skin Tone":
            X.extend([251, 229, 186])
        case "Dark Skin Tone":
            X.extend([124, 80, 26])
        case "Tanned Skin Tone":
            X.extend([210, 180, 140])
    print(interest_style)
    match interest_style:
        case "Minimalist":
            X.append(1)
        case "Modern":
            X.append(2)
        case "Casual":
            X.append(3)

    print(X)
    # Prepare the response data
    response_data = {"primary_color": "nothing", "secondary_color": "nothing"}

    # Return the response in JSON format
    response = jsonify(response_data)
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3001"
    return response

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
