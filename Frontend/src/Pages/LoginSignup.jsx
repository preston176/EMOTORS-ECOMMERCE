import React, { useState } from 'react'
import './Css/LoginSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const LoginSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
        // Perform form validation
        if (!name || !email || !password || !confirmPassword || !phone) {

            // alert('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }

        if (phone.length !== 10) {
            // alert('Phone number should be 10 digits');
            toast.error('Phone number should be 10 digits');
            return;
        }

        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            // alert('Invalid email');
            toast.error('Invalid email');
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
            password: password,
            phone: phone
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
                    navigate('/loginpage');
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
            <Navbar />
            <div className='loginsignup'>
                <div className="loginsignup-container">
                    <h1>Sign Up</h1>
                    <div className="loginsignup-fields">
                        <input required value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Your name' />
                        <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address' />
                        <input required value={phone} onChange={e => {
                            // Ensure the length of the value doesn't exceed 10
                            if (e.target.value.length <= 10) {
                                setPhone(e.target.value);
                            }
                        }} type='number' placeholder='Phone Number' />
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
