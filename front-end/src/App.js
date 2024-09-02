// import logo from './logo.svg';
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [longitude, setLongitude] = useState('');
//     const [latitude, setLatitude] = useState('');
//     const [month, setMonth] = useState('');
//     const [prediction, setPrediction] = useState(null);

//     const handlePredict = async (e) => {
//         e.preventDefault();
        
//         const data = {
//             Longitude: longitude,
//             Latitude: latitude,
//             Month: month
//         };

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', data);
//             setPrediction(response.data);
//         } catch (error) {
//             console.error("There was an error making the request!", error);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Weather Prediction App</h1>
//             <form onSubmit={handlePredict}>
//                 <label>
//                     Longitude:
//                     <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Latitude:
//                     <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Month:
//                     <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} required />
//                 </label>
//                 <br />
//                 <button type="submit">Predict</button>
//             </form>
//             {prediction && (
//                 <div>
//                     <h2>Prediction Results:</h2>
//                     <p>Rainfall = {prediction.rainfall}</p>
//                     <p>Temperature = {prediction.temperature}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PredictionPage from './page/PredictionPage';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutPage from './page/LogoutPage';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Weather App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/predict">Prediction</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </header>

                <div className="container mt-4">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/predict" element={<PredictionPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/" element={<h1>Welcome to the Weather Prediction and Registration App</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
