import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/register', {
                method: 'POST',  // Corrected the typo 'methopd' to 'method'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/login');  // Assuming you are using React Router
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
                    <h3 className="text-center text-primary mb-5">Register</h3>

                    <MDBInput
                        wrapperClass='mb-4'
                        label='Name'
                        id='form1'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <MDBInput
                        wrapperClass='mb-4'
                        label='Email address'
                        id='form2'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <MDBInput
                        wrapperClass='mb-4'
                        label='Password'
                        id='form3'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-danger text-center">{error}</p>}

                    <MDBBtn className="mb-4" onClick={handleRegister}>REGISTER</MDBBtn>

                    <div className="text-center mb-2">
                        <p><Link to="/login">Login</Link></p>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>

    );
}

export default RegisterForm;
