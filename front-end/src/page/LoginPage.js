import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/predict'); 
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex justify-content-center">
            <MDBCard style={{ minWidth: '400px' }}>
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="text-center text-primary mb-5">Login</h3>

                    <MDBInput
                        wrapperClass='mb-4'
                        label='Email address'
                        id='form1'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Password'
                        id='form2'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-danger text-center">{error}</p>}

                    <MDBBtn className="mb-4" onClick={handleLogin}>Login</MDBBtn>

                    <div className="text-center mb-5">
                        <p><Link to="/register">Register</Link></p>
                    </div>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default LoginPage;
