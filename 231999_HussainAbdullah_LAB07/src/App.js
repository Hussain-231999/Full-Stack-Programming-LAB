import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './style.css';

import Header from './components/Header';
import Footer from './components/Footer';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import About from './pages/About';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/MyAccount';
import { EditAccount, EditBilling, EditShipping } from './pages/EditPages';
import Contact from './pages/Contact';
import Terms from './pages/Terms';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => setCartCount(c => c + 1);

  return (
    <>
      <ScrollToTop />
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category onAddToCart={addToCart} />} />
        <Route path="/product" element={<Product onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist onAddToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/edit-billing" element={<EditBilling />} />
        <Route path="/edit-shipping" element={<EditShipping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
