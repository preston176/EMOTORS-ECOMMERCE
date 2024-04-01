import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '/Bikes/giant_hybrid.png'
import { Link } from 'react-scroll'
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">

                <div>
                    <div className="hero-hand-icon">
                        <p>Hello</p>
                        <img src={hand_icon} alt="hand_icon" />
                    </div>
                    <p>
                    <Typewriter
                        options={{
                            strings: ['Find Your Perfect Ride Today !', 'Pedal into adventure', 'Explore new horizons with our bikes', 'Get your dream bike today'],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 50,
                            delay: 40
                        }}
                    /></p>
                </div>
                <a href="#popular" className='hero-link'>
                    <div className="hero-latest-btn">
                        <Link to='popular' smooth={true}
                            offset={50}
                            duration={500}
                            isDynamic={true}>
                            <div>Buy Now</div>
                        </Link>
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
