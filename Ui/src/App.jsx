import React, { useState } from 'react'
import Header1 from './Components/Header1'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/index'
import Petreg from './Pages/Petreg'
import Appoin from './Pages/Bookappoinment'
import Petcare from './Pages/Petcare'
import Vaccineservice from './Pages/Vaccineservice'
import Store from './Pages/Shop'
import Cart from './Components/Cart'

const App = () => {
  // 1. Shared state variables to hold the products added to the basket
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  // 2. State handler to cleanly increment quantity or push a new pet product
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
    
    // Updates the tracking dictionary to flag the green "✓" checkmark
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
  };

  return (
    <div className="box bg-amber-50">
     <Header1/> 
     <div className=''>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Petreg' element={<Petreg/>}/>
          <Route path='/appoin' element={<Appoin/>} />
          <Route path='/petcare' element={<Petcare/>} />
          <Route path='/Vaccineservice' element={<Vaccineservice/>} />
          
          {/* 3. Pass down cart, handler, and dictionary flags to the Store view */}
          <Route 
            path='/shop' 
            element={<Store cart={cart} onAdd={handleAddItem} addedItems={addedItems} />} 
          />
          
          {/* 4. Pass down cart data array and setter hooks to the Cart funnel */}
          <Route 
            path='/cart' 
            element={<Cart cart={cart} setCart={setCart} />} 
          />
       </Routes>
     </div>
     <Footer/>
    </div>
  )
}

export default App