import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setMenu] = useState("shop")



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
                <Link to='/login'><button>Login</button></Link>
                <Link to="/cart"> <img src={cart_icon} alt='cart' /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}

export default Navbar
