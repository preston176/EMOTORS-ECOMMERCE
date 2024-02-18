import React, { useState } from 'react';
import './Css/LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
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

        try {
            // Make a POST request to your backend API for user login
            const loginResponse = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!loginResponse.ok) {
                // Error occurred during login, handle accordingly
                toast.error('Invalid email or password');
                return;
            }

            // User logged in successfully
            const loginData = await loginResponse.json();
            const userEmail = email; // Assuming email is accessible in this scope

            // Fetch user ID using the email
            const idResponse = await fetch(`http://localhost:3000/login_id?email=${userEmail}`);

            if (idResponse.ok) {
                const idData = await idResponse.json();
                const userId = idData.userId; // Assuming the response JSON contains userId

                // Set the user ID and show success message
                setUserId(userId);
                toast.success('Login successful');

                navigate(`${userId}/profile`)
            } else {
                // Error occurred while fetching user ID
                toast.error('Error fetching user ID');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred, please try again later');
        }
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
            <Navbar />
            <div className='loginsignup'>
                <div className="loginsignup-container">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} >
                        <div className="loginsignup-fields">
                            <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address' />
                            <input required value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Your password' />
                        </div>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    <p className='loginsignup-login'>Don't have an account? <span><Link to={"/signup"}>Sign Up</Link></span></p>

                </div>
            </div>
        </>
    )
}

export default Login;
