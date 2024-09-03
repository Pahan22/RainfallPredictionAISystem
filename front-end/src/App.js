import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PredictionPage from './page/PredictionPage';
import './assets/css/style.css';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import LogoutPage from './page/LogoutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar navbar-expand-lg navbar-light custom-bg ps-5">
          <a className="navbar-brand text-white" href="/">
            <img
              src={require('./assets/img/Logo.jpg')}
              alt="Logo"
              style={{ height: '60px', marginRight: '30px' }}
            />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link  text-white" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" to="/predict">Prediction</Link>
              </li>
              {/* <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li> */}
            </ul>
          </div>
        </header>

        <div className="container mt-5">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/predict" element={<PredictionPage />} />
            {/* <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/" element={<h1>Welcome to the Weather Prediction and Registration App</h1>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
