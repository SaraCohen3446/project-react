import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import List from './pages/List';
import Cart from './pages/Cart';
import axios from "axios";
import OneItem from './component/OneProduct';
import NavBar from './component/NavBar';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import FormProduct from './pages/FormProduct';
import ShowDetalis from './component/ShowDetails';
import ChekUser from './pages/ChekUser';
import OrderForm from './pages/OrderFrom';
import ProtectedRoute from './component/ProtectedRoute';
import AllOrders from './pages/AllOrders';
import OrderByUser from './pages/OrderByUser';


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/FormProduct" element={<ProtectedRoute><FormProduct /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/ChekUser" element={<ChekUser />} /> {/* עדכון לנתיב החדש */}
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path='/AllOrders' element={<AllOrders />} />
        <Route path='/OrderByUser' element={<OrderByUser />} />
        <Route path="/" element={<List />} />
        <Route path="/details/:id" element={<ShowDetalis />} /> {/* שים את זה בנפרד */}
      </Routes >

    </>
  );
}

export default App;
