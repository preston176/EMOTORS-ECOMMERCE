import React, { useState } from 'react';
import './Css/LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform form validation
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Prepare the user data to send to the server
        const userData = {
            email: email,
            password: password
        };

        // Make a POST request to your backend API for user login
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    // User logged in successfully, you can redirect or show a success message
                    toast.success('Login successful');
                    
                } else {
                    // Error occurred during login, handle accordingly
                    toast.error('Invalid email or password');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('An error occurred, please try again later');
            });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: '400px', fontSize: '1.5rem' }}
            />
            <div className='loginsignup'>
                <div className="loginsignup-container">
                    <h1>Login</h1>
                    <div className="loginsignup-fields">
                        <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Your password' />
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    <p className='loginsignup-login'>Don't have an account? <span>Sign Up</span></p>
                    <div className="loginsignup-agree">
                        <input type='checkbox' />
                        <p>By continuing you agree ...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
