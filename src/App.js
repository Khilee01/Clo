import React, { createContext, useContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CloBrand from './CloBrand';
import Clothetic from './Clothetic';
import DummyCheckout from './DummyCheckout';
import ErrorDisplay from './ErrorDisplay';
import HomePage from './HomePage';
import ProductDetails from './ProductDetails';
import Products from './Products';
import SupportPage from './SupportPage';
import UserCart from './UserCart';
/* 
REMEMBER!
ALL ROUTES ARE STORED IN THIS FILE I.E. APP.JS
WHEREAS LINKS CAN BE ANYWHERE!

AND DO NOT FORGET TO THINK IN A HIERARCHICAL MANNER IN REACT
*/

function Heading() {
  return (
    <div className="App_Header">
      <CloBrand />
      <nav className="App_Header_Navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/clothetic">CloBot</Link>
        <Link to="/support">Support</Link>
        <Link to="/userCart">Cart</Link>
      </nav>
    </div>
  );
}


export const cartContext = createContext()

export default function App() {
  const [cart, setCart] = useState([])
  
  return (
    <cartContext.Provider value={{cart, setCart}}>
    <div className="App">
      <Heading />           {/* returns a div containing the application’s header */}      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clothetic" element={<Clothetic />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/userCart' element={<UserCart />} />
        <Route path='/support' element={<SupportPage />} />
        <Route path={`/checkout`} element={<DummyCheckout />} />
        <Route path={`/*`} element={<ErrorDisplay />} />
      </Routes>
    </div>
    </cartContext.Provider>
  );
}

export const useCartContext = () => useContext(cartContext)
