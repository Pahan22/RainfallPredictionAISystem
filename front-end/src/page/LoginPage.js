import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import './../assets/css/LoginSignup.css';

const LoginPage = () => {
    const [action, setAction] = useState('Sign Up');

    return (
        <div className='container'>
            <div className='header'>
                <div className='text text-white'>{action}</div>
            </div>
            <div className='inputs'>
                {action === "Log In" ? null : (
                    <div className='input'>
                        {/* <img src={user} alt='' /> */}
                        <input placeholder='User Id' type='text' />
                    </div>
                )}
                <div className='input'>
                    {/* <img src={email} alt='' /> */}
                    <input placeholder='Email ID' type='email' />
                </div>
                <div className='input'>
                    {/* <img src={password} alt='' /> */}
                    <input placeholder='Password' type='password' />
                </div>
            </div>
            <div className="forgot-password">Lost Password? <span>click here</span></div>
            <div className="sumbit-container">
                <div className={action === "Log In" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Log In") }}>Log In</div>
            </div>
        </div>
    );
};

export default LoginPage;
