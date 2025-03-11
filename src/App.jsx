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
import CheckForOrder from './pages/ChekForOrder';
import OrderForm from './pages/OrderFrom';
import ProtectedRoute from './component/ProtectedRoute';

function App() {

  return (
    <>
      <NavBar />
      <div style={{ marginTop: '160px' }}> {/*navbar הוספת רווח מתח ל */}
        <Routes>
          <Route path="/FormProduct" element={<ProtectedRoute><FormProduct /></ProtectedRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/checkfororder" element={<CheckForOrder />} /> {/* עדכון לנתיב החדש */}
          <Route path="/orderForm" element={<OrderForm/>}/>
          <Route path="/" element={<List />} />
          <Route path="/details/:id" element={<ShowDetalis />} /> {/* שים את זה בנפרד */}
        </Routes >
      </div>
    </>
  );
}

export default App;
