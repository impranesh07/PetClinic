import React, { useState } from 'react'
import Header1 from './Components/Header1'
import Footer from './Components/Footer'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './Pages/index'
import Petreg from './Pages/Petreg'
import Appoin from './Pages/Bookappoinment'
import Petcare from './Pages/Petcare'
import Vaccineservice from './Pages/Vaccineservice'
import Store from './Pages/Shop'
import Cart from './Components/Cart'
import Signin from './Components/Signin'
import AdminDash from './Pages/AdminDash'
import AdminLogin from './Components/Adminlogin'

// Full-screen 404 View (No header/footer clutter)
const NotFound = () => (
  <div className="min-h-screen bg-amber-50/50 flex flex-col items-center justify-center text-center px-4">
    <h2 className="text-8xl font-black text-amber-600 font-mono mb-2">404</h2>
    <h3 className="text-2xl font-bold text-slate-800 mb-2">Oops! Page Lost in space</h3>
    <p className="text-sm text-slate-500 max-w-xs mb-6">We couldn't find the page you were looking for. Double check the URL or head back home!</p>
    <a href="/" className="btn bg-amber-600 hover:bg-amber-700 text-white border-none font-bold px-6">
      Go Back Home
    </a>
  </div>
);

// Layout wrapper for Public Pages only
const PublicLayout = () => (
  <div className="box bg-amber-50 min-h-screen flex flex-col justify-between">
    <div>
      <Header1 />
      {/* This Outlet renders whatever public child route matches */}
      <Outlet />
    </div>
    <Footer />
  </div>
);

const App = () => {
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  const handleAddItem = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
  };

  return (
    <Routes>
      {/* 1. COMPLETELY ISOLATED PAGES (No headers or footers) */}
      <Route path='/Admin01' element={<AdminLogin />} />
      <Route path='/AdminDash' element={<AdminDash />} />
      
      {/* 2. PUBLIC INTERFACE PAGES WITH SHARED WRAPPER */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/Petreg' element={<Petreg />} />
        <Route path='/appoin' element={<Appoin />} />
        <Route path='/petcare' element={<Petcare />} />
        <Route path='/Vaccineservice' element={<Vaccineservice />} />
        <Route 
          path='/shop' 
          element={<Store cart={cart} onAdd={handleAddItem} addedItems={addedItems} />} 
        />
        <Route 
          path='/cart' 
          element={<Cart cart={cart} setCart={setCart} />} 
        />
        <Route path='/signin' element={<Signin />} />
      </Route>

      {/* 3. GLOBAL FALLBACK (Catches anything else without header/footer layout) */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;