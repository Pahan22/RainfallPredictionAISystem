import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

const RegisterPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an async operation
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="App">
            {loading ? <Spinner /> : <div>Data has been loaded</div>}
        </div>
    );
};

export default RegisterPage;
