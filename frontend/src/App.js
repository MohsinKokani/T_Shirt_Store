import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import './App.css';

import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail.jsx"
import Reviews from "./components/Reviews/Reviews.jsx"
import Register from "./components/User/Register.jsx";
import Login from "./components/User/Login.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import Profile from "./components/User/Profile.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping";
import PrevOrders from "./components/Cart/PrevOrders";

import { loadUser } from "./actions/user";
import PrevOrder from "./components/Cart/PrevOrder";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie('token')) dispatch(loadUser());
    //eslint-disable-next-line
  }, [])
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/reviews/:id' element={<Reviews />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/myOrders' element={<PrevOrders />} />
          <Route path='/myOrders/:id' element={<PrevOrder />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;