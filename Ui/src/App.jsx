import React, { useState } from "react";
import Header1 from "./Components/Header1";
import Footer from "./Components/Footer";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import Home from "./Pages/index";
import Petreg from "./Pages/Petreg";
import Appoin from "./Pages/Bookappoinment";
import Petcare from "./Pages/Petcare";
import Vaccineservice from "./Pages/Vaccineservice";
import EmergencyServices from "./Pages/EmergencyServices";
import Store from "./Pages/Shop";

import Cart from "./Components/Cart"; // Single Cart component handles review & checkout steps internally
import Signin from "./Components/Signin";
import UserPanel from "./Components/UserPanel";

import AdminDash from "./Pages/AdminDash";
import AdminLogin from "./Components/Adminlogin";
import ProtectedRoute from "./Components/ProtectedRoute";

// ============================
// 404 PAGE
// ============================
const NotFound = () => (
  <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
    <h1 className="text-8xl font-bold text-amber-600">404</h1>
    <h2 className="text-2xl font-bold">Page Not Found</h2>
    <a href="/" className="btn bg-amber-600 text-white mt-5">
      Go Home
    </a>
  </div>
);

// ============================
// WEBSITE LAYOUT
// ============================
const WebsiteLayout = ({ cartCount }) => (
  <div className="bg-amber-50 min-h-screen flex flex-col">
    {/* Passed cartCount down so Header1 can display item counts over the basket */}
    <Header1 cartCount={cartCount} />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// ============================
// APP
// ============================
const App = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  // 1. Add item to cart
  const handleAddItem = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setAddedItems((prev) => ({
      ...prev,
      [product.id]: true,
    }));
  };

  // 2. Adjust item counts up or down inside the cart views
  const handleUpdateQty = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );
  };

  // 3. Delete items completely out of context and revert catalog buttons
  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setAddedItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Global running aggregate item sum calculation
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <Routes>
      {/* =====================
      ADMIN
      ===================== */}
      <Route path="/Admin01" element={<AdminLogin />} />
      <Route path="/AdminDash" element={<AdminDash />} />

      {/* =====================
      WEBSITE
      ===================== */}
      <Route element={<WebsiteLayout cartCount={totalItemsCount} />}>
        <Route path="/" element={<Home />} />

        {/* LOGIN REQUIRED */}
        <Route
          path="/Petreg"
          element={
            <ProtectedRoute>
              <Petreg />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appoin"
          element={
            <ProtectedRoute>
              <Appoin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/petcare"
          element={
            <ProtectedRoute>
              <Petcare />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Vaccineservice"
          element={
            <ProtectedRoute>
              <Vaccineservice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/EmergencyServices"
          element={
            <ProtectedRoute>
              <EmergencyServices />
            </ProtectedRoute>
          }
        />

        {/* SHOP ROUTE - FIXED */}
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Store
                cart={cart}
                onAdd={handleAddItem}
                addedItems={addedItems}
                onViewCart={() => navigate("/cart")}
              />
            </ProtectedRoute>
          }
        />

        {/* UNIFIED CART & CHECKOUT PIPELINE */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart 
                cart={cart} 
                setCart={setCart}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onBackToShop={() => navigate("/shop")}
              />
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/user" element={<UserPanel />} />
      </Route>

      {/* =====================
      404
      ===================== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;