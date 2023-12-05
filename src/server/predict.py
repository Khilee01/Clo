import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:3001"]}})

def calculate_cosine_similarity_and_index(user_input):
    file_path = r"recommend_primary_secondary.csv"
    dataset = np.genfromtxt(file_path, delimiter=",")
    dataset = dataset[1:]
    X_from_predefined_dataset = dataset[:, :7]

    cosine_similarities = cosine_similarity(
        X_from_predefined_dataset, user_input.reshape(1, -1)
    )

    max_similarity_index = np.argmax(cosine_similarities)

    return dataset[max_similarity_index, 7:10], dataset[max_similarity_index, 10:]    #hence returning the primary and secondary

def compare_to_colors(unit):
    if unit.tolist() == [255, 255, 255]:
        return 'White'
    elif unit.tolist() == [0, 0, 0]:
        return 'Black'
    elif unit.tolist() == [220, 20, 60]:
        return 'Crimson'
    elif unit.tolist() == [255, 255, 244]:
        return 'Off-White'
    elif unit.tolist() == [212, 246, 221]:
        return 'Lime Green'
    elif unit.tolist() == [203, 195, 227]:
        return 'Light Purple'
    elif unit.tolist() == [0, 0, 128]:
        return 'Navy Blue'
    elif unit.tolist() == [255, 165, 0]:
        return 'Orange'
    elif unit.tolist() == [255, 255, 0]:
        return 'Yellow'

def calculateFinalOutput(X):
    primary, secondary = calculate_cosine_similarity_and_index(X)
    primary_color = compare_to_colors(primary)
    secondary_color = compare_to_colors(secondary)
    return primary_color, secondary_color

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
    primary, secondary = calculateFinalOutput(np.array(X))
    # Prepare the response data
    response_data = {"primary_color": primary, "secondary_color": secondary}

    # Return the response in JSON format
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
