import React from 'react'
import "./Offers.css"
import exclusive_image from '../Assets/exclusive_image.jpg'
import { Link } from 'react-scroll'

const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <Link to={"popular"} smooth={true} spy={true}
                    hashSpy={true}
                    offset={50}
                    duration={500}
                    isDynamic={true}>
                    <button>Check Now</button>
                </Link>
            </div>
            <div className="offers-right">
                <Link to={"popular"} smooth={true} spy={true}
                    hashSpy={true}
                    offset={50}
                    duration={500}
                    isDynamic={true}>
                    <img src={exclusive_image} alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Offers
