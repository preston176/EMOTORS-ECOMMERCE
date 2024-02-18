import React from 'react'
import './CSS/ThankYou.css'

const ThankYou = () => {
    return (
        <div className='thank-you-page-container'>
            <h1>Thank you for your order!</h1>
            <p>Your order has been placed successfully</p>
            <div className="">
                You can track your order from <a href="/">here</a>
            </div>

        </div>
    )
}

export default ThankYou
