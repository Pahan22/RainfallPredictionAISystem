from flask import Flask, request, jsonify
import pickle
import xgboost as xgb
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
import random

with open('saved_model.pkl','rb') as file:
    data = pickle.load(file)
    model = data['model']
    scaler = data['scaler']

app = Flask(__name__)

cred = credentials.Certificate("serviceAccountKey.json")
firebase_app = initialize_app(cred)
db = firestore.client()

@app.route('/predict_data', methods=['POST'])
def predict_data():
    try:
        # Get JSON data from the request
        data = request.get_json()
        
        # Extract input values
        longitude = data.get('longitude')
        latitude = data.get('latitude')
        month = data.get('month')

        # Convert to float and int
        longitude = float(longitude)
        latitude = float(latitude)
        month = int(month)

        # Prepare the input data
        new_data = [[longitude, latitude, month]]

        # Scale the input data
        new_data_scaled = scaler.transform(new_data)

        # Predict using the loaded model
        pred = model.predict(new_data_scaled)

        # Extract predictions
        rainfall = round(float(pred[0][0]))
        temperature = round(float(pred[0][1]))

        # Ensure non-negative rainfall
        if rainfall < 0:
            rainfall = 2

        # Prepare the result
        result = {
            "location": f"Longitude: {longitude}, Latitude: {latitude}",
            "month": month,
            "rainfall": rainfall,
            "temperature": temperature,
            "prediction": "Sample Prediction"  # Adjust this if needed
        }

        # Print for debugging
        print(f"Longitude: {longitude}")
        print(f"Latitude: {latitude}")
        print(f"Temperature: {temperature}")
        print(f"Rainfall: {rainfall}")

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    
    print(email + '\n' + password)

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    docs = db.collection('users').where('email', '==', email).stream()

    for doc in docs:
        user_data = doc.to_dict() 
        if user_data.get("password") == password:
            return jsonify({"message": "Login successful"}), 200
    
    return jsonify({"message": "Invalid email or password"}), 401
    
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    print(name + '\n' + email + '\n' + password)

    if not name or not email or not password:
        return jsonify({"message": "Name, email, and password are required"}), 400

    existing_user = db.collection('users').where('email', '==', email).stream()
    if any(existing_user):
        return jsonify({"message": "User already exists"}), 400

    user_ref = db.collection('users').add({
        'name': name,
        'email': email,
        'password': password  
    })

    return jsonify({"message": "User registered successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
