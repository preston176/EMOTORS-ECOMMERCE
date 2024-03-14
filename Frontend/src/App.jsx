import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import ConfirmOrder from './Pages/ConfirmOrder'
import LoginSignUp from './Pages/LoginSignUp'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile'
import { UserAuthContext } from './Context/UserAuthContext'
import OrderLoginPage from './Pages/OrderLoginPage'
import OrderSignUpPage from './Pages/OrderSignUpPage'
import ThankYou from './Pages/ThankYou';


const App = () => {


  const [isAuth, setIsAuth] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);



  const handleUserAuth = () => {
    setIsAuth(!isAuth);
  };


  return (
    <div>
      <BrowserRouter>
        <UserAuthContext.Provider value={{ isAuth, handleUserAuth, userDetails, setUserDetails, quantity, setQuantity }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/product' element={<Product />}>       <Route path=':productId' element={<Product />} />
            </Route>
            <Route path="/product/:productId/confirm-order" element={<ConfirmOrder />} />
            <Route path="/signUp" element={<LoginSignUp />} />
            <Route path='/loginPage' element={<Login />} />
            <Route path='/loginPage/:userId/profile' element={<UserProfile />} />
            {/* Alternative login / signup pages */}
            <Route path='/order-login-page' element={<OrderLoginPage />} />
            <Route path='/order-signup-page' element={<OrderSignupPage />} />
            <Route path='/thank-you' element={<ThankYou />} />
          </Routes>
          <Footer />
        </UserAuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
