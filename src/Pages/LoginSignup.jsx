import React from 'react'
import './Css/LoginSignup.css'

const LoginSignup = () => {
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type='text' placeholder='Your name' />
                    <input type='email' placeholder='Email Address' />
                    <input type='password' placeholder='Your password' />
                </div>
                <button>Sign Up</button>
                <p className='loginsignup-login'>Already have an account? <span>Login</span></p>
                <div className="loginsignup-agree">
                    <input type='checkbox' />
                    <p>By continuing you agree ...</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup
