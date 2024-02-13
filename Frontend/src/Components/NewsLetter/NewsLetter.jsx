import React from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {
    return (
        <div className='newsletter'>
            <h1>Get Exclusive Offers on your Email</h1>
            <h1>Subscribe to our newsletter and stay up to date</h1>
            <div>
                <input type="email" placeholder='Enter your email ...' />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter
