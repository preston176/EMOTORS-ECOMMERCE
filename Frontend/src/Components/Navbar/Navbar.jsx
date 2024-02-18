import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ auth = false }) => {

    const navigate = useNavigate();

    const handleBtnClick = () => {
        if (auth) {
            // Log out the user
            navigate('/');
        } else {
            // Redirect to login page
            navigate('/loginpage');
        }


    }


    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
                <p>Shopper</p>
            </div>
            <ul className='nav-menu'>
                <li><Link to='/'>Shop</Link> <hr /></li>
                <li><Link to='/mens'>Men</Link></li>
                <li><Link to='/womens'>Women</Link></li>
                <li><Link to='/kids'>Kids</Link></li>
            </ul>
            <div className='nav-login-cart'>
                <button onClick={handleBtnClick}>{auth ? "Log Out" : "Log In"}</button>
                
            </div>
        </div>
    )
}

export default Navbar
