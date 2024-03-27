import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../Context/UserAuthContext";
import logo from "../Assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation().pathname;
  const isAdminRoute = location.includes("admin");
  const isHomePage = location === "/";
  const {
    isAuth,
    handleUserAuth,
    userDetails,
    setUserDetails,
    userId,
    setUserId,
  } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleBtnClick = () => {
    if (isAuth || userId) {
      handleUserAuth();
      setUserId(undefined);
      navigate("/");
    } else {
      setUserDetails(null);
      navigate("/loginpage");
    }
  };
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#fa6400",
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <ul className="nav-menu">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/casual"
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Casual
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sports"
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Sports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kids"
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Kids
          </NavLink>
        </li>
      </ul>
      <div className="nav-login-cart">
        <button onClick={handleBtnClick}>
          {isAuth || userId ? "Log Out" : "Log In"}
        </button>
        {(!isAdminRoute || !isHomePage) && isAuth && (
          <Link to={`/loginpage/${userDetails.id}/profile`}>
            <h2>View Orders</h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
