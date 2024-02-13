import React from 'react'
import "./Footer.css"
import footer_logo from '../Assets/logo_big.png';
import instagram_logo from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="footer logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-socials-icon">
                <div className="footer-icons-container">
                    <img src={instagram_logo} alt="instagram logo" />

                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="instagram logo" />

                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>&copy; 2024 Shopper. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
