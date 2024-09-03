from flask import Flask, request, jsonify
import pickle
import xgboost as xgb

model = pickle.load(open(r'saved_model.pkl','rb'))

app = Flask(__name__)

@app.route('/predict_data', methods=['POST'])
def predict_data():
    try:
        data = request.get_json()
        longitude = data.get('longitude')
        latitude = data.get('latitude')
        month = data.get('month')

        pred = model.predict([[float(longitude),float(latitude),int(month)]])

        rainfall = round(float(pred[0][0]), 2)
        temperature = round(float(pred[0][1]), 2)


        # Process the data (e.g., use it in a prediction model)
        # Here, we'll return a dummy response
        result = {
            "location": f"Longitude: {longitude}, Latitude: {latitude}",
            "month": month,
            "rainfall": rainfall,
            "temperature": temperature,
            "prediction": "Sample Prediction"  # Replace with your actual prediction logic
        }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
