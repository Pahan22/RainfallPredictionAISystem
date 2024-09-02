import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', data);
            if (response.status === 200) {
                // Redirect to /predict after successful login
                navigate('/predict');
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
        }
    };

    return (
        <div className="container shadow p-3 mt-5 col-6">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
