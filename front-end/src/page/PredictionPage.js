import React, { useState } from 'react';
import axios from 'axios';
// import './PredictionPage.css'; // You can add specific styles for this page

function PredictionPage() {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [month, setMonth] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async (e) => {
        e.preventDefault();
        
        const data = {
            Longitude: longitude,
            Latitude: latitude,
            Month: month
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', data);
            setPrediction(response.data);
        } catch (error) {
            console.error("There was an error making the request!", error);
        }
    };

    return (
        <div className="PredictionPage">
            <h1>Weather Prediction App</h1>
            <form onSubmit={handlePredict}>
                <label>
                    Longitude:
                    <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                </label>
                <br />
                <label>
                    Latitude:
                    <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                </label>
                <br />
                <label>
                    Month:
                    <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Predict</button>
            </form>
            {prediction && (
                <div>
                    <h2>Prediction Results:</h2>
                    <p>Rainfall = {prediction.rainfall}</p>
                    <p>Temperature = {prediction.temperature}</p>
                </div>
            )}
        </div>
    );
}

export default PredictionPage;
