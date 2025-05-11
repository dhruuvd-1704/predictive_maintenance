from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS  # To handle cross-origin requests if needed
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# Load the trained classification model (ensure the path is correct)
model_path = os.path.join(os.getcwd(), 'model/classification_model.pkl')
model_failure = joblib.load(model_path)
print(f"Model loaded from: {model_path}")  # Debugging line to print model path

# Route to handle failure probability prediction (POST /predict)
@app.route('/predict', methods=['POST'])
def predict_failure():
    try:
        # Get JSON data sent from the frontend
        data = request.json
        print(f"Received data: {data}")  # Debugging line to print received data

        # Ensure that all necessary features are provided
        required_features = ['air_temperature', 'process_temperature', 'rotational_speed', 'torque', 'tool_wear']
        for feature in required_features:
            if feature not in data:
                return jsonify({'error': f'Missing feature: {feature}'}), 400

        # Extract features from the received data
        features = np.array([
            data['air_temperature'],
            data['process_temperature'],
            data['rotational_speed'],
            data['torque'],
            data['tool_wear']
        ]).reshape(1, -1)

        # Predict failure probability using the classification model
        failure_probability = model_failure.predict_proba(features)[0][1]  # Probability of failure
        print(f"Predicted failure probability: {failure_probability}")  # Debugging line

        # Return the failure probability in the response
        return jsonify({
            'failure_probability': failure_probability
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to serve the homepage (optional)
@app.route('/')
def home():
    return "Welcome to the Predictive Maintenance Project API!"

# Start the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
