import React, { useState } from 'react'
import './Css/LoginSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        // Perform form validation
        if (!name || !email || !password || !confirmPassword) {
            // alert('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Prepare the user data to send to the server
        const userData = {
            username: name,
            email: email,
            password: password
        };

        // Make a POST request to your backend API to create a new user
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    // User created successfully, you can redirect or show a success message
                    // alert('User created successfully');
                    toast.success('User created successfully');
                } else {
                    // Error occurred during user creation, handle accordingly
                    // alert('Failed to create user');
                    toast.error('Failed to create user');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // alert('An error occurred, please try again later');
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
                    <h1>Sign Up</h1>
                    <div className="loginsignup-fields">
                        <input required value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Your name' />
                        <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Your password' />
                        <input required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm password' />
                    </div>
                    <button onClick={handleSignup}>Sign Up</button>
                    <p className='loginsignup-login'>Already have an account? <span> <Link to={"/loginpage"}>Login</Link></span></p>

                </div>

            </div>
        </>
    )
}

export default LoginSignup
