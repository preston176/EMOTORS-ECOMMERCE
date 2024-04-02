import { useState } from 'react'
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
import OrderLoginPage from './Pages/OrderLoginPage'
import OrderSignupPage from './Pages/OrderSignupPage'
import ThankYou from './Pages/ThankYou';
import AdminPage from './Pages/AdminPage';
import AdminLoginPage from './Pages/AdminLoginPage'
import AdminUserOrdersPage from './Pages/AdminUserOrdersPage'
import AdminManageBikes from './Pages/AdminManageBikes'
import AdminEditBikeInfo from './Pages/AdminEditBikeInfo'
import AdminUpdateStock from './Pages/AdminUpdateStock'
import AdminReports from './Pages/AdminReports'
import AdminAddBike from './Pages/AdminAddBike'


const App = () => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState(''); 


  const [isAuth, setIsAuth] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);



  const handleUserAuth = () => {
    setIsAuth(!isAuth);
  };


  return (
    <div>
      <BrowserRouter>
        <UserAuthContext.Provider value={{ isAuth, handleUserAuth, userDetails, setUserDetails, quantity, setQuantity, userId, setUserId, productId, setProductId }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/casual" element={<ShopCategory banner={men_banner} category="casual" />} />
            <Route path="/sports" element={<ShopCategory banner={women_banner} category="sports" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kids" />} />
            <Route path='/product' element={<Product />}>       <Route path=':productId' element={<Product />} />
            </Route>
            <Route path="/product/:productId/confirm-order" element={<ConfirmOrder />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path='/loginpage' element={<Login />} />
            <Route path='/adminloginpage' element={<AdminLoginPage />} />
            <Route path='/loginpage/:userId/profile' element={<UserProfile />} />
            <Route path='/adminloginpage/:userId/admin' element={<AdminPage />} />
            <Route path='/adminloginpage/:userId/adminuserorders' element={<AdminUserOrdersPage />} />
            <Route path='/adminloginpage/:userId/adminmanagebikes' element={<AdminManageBikes />} />
            <Route path='/adminloginpage/:userId/adminmanagebikes/adminaddbike' element={<AdminAddBike />} />
            <Route path='/adminloginpage/:userId/adminmanagebikes/admineditbikeinfo/:productId' element={<AdminEditBikeInfo />} />
            <Route path='/adminloginpage/:userId/adminmanagebikes/adminupdatestock/:productId' element={<AdminUpdateStock />} />
            {/* Reports routes */}
            <Route path='/adminloginpage/:userId/adminreports' element={<AdminReports />} />
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
