import React, { useContext, useEffect } from 'react'
import './CSS/ThankYou.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../Context/UserAuthContext';

const ThankYou = () => {
    const { isAuth, handleUserAuth, userDetails, setUserDetails } = useContext(UserAuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (userDetails.id === null) {
            navigate("/");
            return;
        }
    }, []);
    return (
        <div className='thank-you-page-container'>
            <h1>Thank you for your order!</h1>
            <p>Your order has been placed successfully</p>

            <div className="">
                You can track your order from <Link to={`/loginpage/${userDetails.id}/profile`}>
                    <button className='button'>Here</button>
                </Link>
            </div>

        </div>
    )
}

export default ThankYou
