import React, { useState } from 'react';
import axios from 'axios';
// import './RegisterPage.css'; // You can add specific styles for this page

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/register', data);
            console.log('User registered:', response.data);
        } catch (error) {
            console.error("There was an error registering the user!", error);
        }
    };

    return (
        <div className="RegisterPage col-8">
            <h1>User Registration</h1>
            <form onSubmit={handleRegister}>
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">First Name:</label>
                        <div class="col-sm-10">
                            <input type="text" className="form-control"  value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                </div>
                    <br />
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Last Name:</label>
                        <div class="col-sm-10">
                            <input type="text" className="form-control"  value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                </div>

                    <br />
                
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label"> Email: </label>
                    <div class="col-sm-10">
                        <input type="email" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                    

                    <br />
                    
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Password:</label>
                        <div class="col-sm-10">
                            <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                </div>
                    <br />

                    <button type="submit">Register</button>
                {/* </div> */}
            </form>
        </div>
    );
}

export default RegisterPage;
