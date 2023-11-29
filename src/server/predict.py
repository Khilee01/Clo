import pandas as pd
from autogluon.tabular import TabularPredictor
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def predict_colors(favorite_color, skin_tone, interest_style):
    # Load the trained models
    loaded_predictor_primary = TabularPredictor.load("AutogluonModels/ag-20231128_215439/")
    loaded_predictor_secondary = TabularPredictor.load("AutogluonModels/ag-20231128_215451/")

    # Create a DataFrame with the input data
    X_test = pd.DataFrame({
        'favorite_color': [favorite_color],
        'skin_tone': [skin_tone],
        'interest_style': [interest_style]
    })

    # Make predictions using the loaded models
    predictions_primary = loaded_predictor_primary.predict(X_test)
    predictions_secondary = loaded_predictor_secondary.predict(X_test)

    # Return the predictions
    return predictions_primary[0], predictions_secondary[0]

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/predict", methods=["POST"])
def receive_data():
    # Extract data from the request
    data = request.get_json()

    favorite_color = data.get('favColor')
    skin_tone = data.get('skinTone')
    interest_style = data.get('interestStyle')

    # Predict the colors
    primary_color, secondary_color = predict_colors(favorite_color=favorite_color, skin_tone=skin_tone, interest_style=interest_style)

    # Prepare the response data
    response_data = {
        'primary_color': primary_color,
        'secondary_color': secondary_color
    }

    # Return the response in JSON format
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
