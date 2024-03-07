import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '/Bikes/giant_hybrid.png'

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">

                <div>
                    <div className="hero-hand-icon">
                        <p>Hello</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Pedal Into Adventure: </p>
                    <p>Find Your Perfect Ride Today!</p>
                </div>
                <a href="#popular" className='hero-link'>
                    <div className="hero-latest-btn">

                        <img src={arrow_icon} alt="arrow-icon" />
                        <div>Buy Now</div>

                    </div>
                </a>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero
