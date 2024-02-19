import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import ConfirmOrder from './Pages/ConfirmOrder'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile'
import { UserAuthContext } from './Context/UserAuthContext'


const App = () => {


  const [isAuth, setIsAuth] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);



  const handleUserAuth = () => {
    setIsAuth(!isAuth);
  };


  return (
    <div>
      <BrowserRouter>
        <UserAuthContext.Provider value={{ isAuth, handleUserAuth, activeUserId, setActiveUserId }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/product' element={<Product />}>       <Route path=':productId' element={<Product />} />
            </Route>
            <Route path="/product/:productId/confirm-order" element={<ConfirmOrder />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path='/loginpage' element={<Login />} />
            <Route path='/loginpage/:userId/profile' element={<UserProfile />} />
          </Routes>
          <Footer />
        </UserAuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
