import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'; // Ensure this path is correct
import Cart from './Pages/Cart/Cart'; // Ensure this component exists
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'; // Ensure this component exists
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopup/LoginPopup'; // Adjust path as needed


const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>

      </Routes>
    </div>
    <Footer/>
    </>
  );
};

export default App;
