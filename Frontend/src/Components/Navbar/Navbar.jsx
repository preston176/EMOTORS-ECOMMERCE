import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { UserAuthContext } from '../../Context/UserAuthContext'

const Navbar = () => {
    // fetch current route
    const location = useLocation().pathname;
    // check whether current route is for admin or user
    const isAdminRoute = location.includes('admin');
    const isHomePage = location === '/';




    const { isAuth, handleUserAuth, userDetails, setUserDetails, userId, setUserId } = useContext(UserAuthContext);

    const navigate = useNavigate();


    const handleBtnClick = () => {
        if (isAuth || userId) {
            // Log out the user
            handleUserAuth();
            setUserId(undefined);
            navigate('/');
        } else {
            // Redirect to login page
            setUserDetails(null);
            navigate('/loginpage');
        }


    }


    return (
        <div className='navbar'>
            <Link to="/" > <div className='nav-logo'>
                <img src={logo} alt='logo' />
                <p>Shopper</p>
            </div>
            </Link>
            <ul className='nav-menu'>
                <li><Link to='/'>Shop</Link> <hr /></li>
                <li><Link to='/casual'>Casual</Link></li>
                <li><Link to='/sports'>Sports</Link></li>
                <li><Link to='/kids'>Kids</Link></li>
            </ul>
            <div className='nav-login-cart'>
                <button onClick={handleBtnClick}>{isAuth || userId ? "Log Out" : "Log In"}</button>
                {/* if the user is authenticated and his / her user id exists then render this */}
                {
                    !isAdminRoute || !isHomePage && isAuth && (
                        <Link to={`/loginpage/${userDetails.id}/profile`}> <h2>View Orders</h2></Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
