import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../Context/UserAuthContext'

const Navbar = () => {

    const { isAuth, handleUserAuth, activeUserId, setActiveUserId } = useContext(UserAuthContext);

    const navigate = useNavigate();

    const handleBtnClick = () => {
        if (isAuth) {
            // Log out the user
            handleUserAuth();
            navigate('/');
        } else {
            // Redirect to login page
            setActiveUserId(null);
            navigate('/loginpage');
        }


    }


    return (
        <div className='navbar'>
            <Link to="/"> <div className='nav-logo'>
                <img src={logo} alt='logo' />
                <p>Shopper</p>
            </div>
            </Link>
            <ul className='nav-menu'>
                <li><Link to='/'>Shop</Link> <hr /></li>
                <li><Link to='/mens'>Men</Link></li>
                <li><Link to='/womens'>Women</Link></li>
                <li><Link to='/kids'>Kids</Link></li>
            </ul>
            <div className='nav-login-cart'>
                <button onClick={handleBtnClick}>{isAuth ? "Log Out" : "Log In"}</button>
                {/* if the user is authenticated and his / her user id exists then render this */}
                {
                    activeUserId && isAuth && (
                       <Link to={`/loginpage/${activeUserId}/profile`}> <h2>View Orders</h2></Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
