import React, { useState } from "react";

import Header1 from "./Components/Header1";
import Footer from "./Components/Footer";

import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Pages/index";
import Petreg from "./Pages/Petreg";
import Appoin from "./Pages/Bookappoinment";
import Petcare from "./Pages/Petcare";
import Vaccineservice from "./Pages/Vaccineservice";
import Store from "./Pages/Shop";

import Cart from "./Components/Cart";
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

<h1 className="text-8xl font-bold text-amber-600">
404
</h1>

<h2 className="text-2xl font-bold">
Page Not Found
</h2>


<a
href="/"
className="btn bg-amber-600 text-white mt-5"
>
Go Home
</a>


</div>

);





// ============================
// WEBSITE LAYOUT
// ============================

const WebsiteLayout = () => (

<div className="bg-amber-50 min-h-screen flex flex-col">

<Header1 />

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


const [cart,setCart] = useState([]);

const [addedItems,setAddedItems] = useState({});




const handleAddItem = (product)=>{


setCart((prev)=>{


const exists = prev.find(
item=>item.id===product.id
);


if(exists){

return prev.map(item=>

item.id===product.id

?

{
...item,
qty:item.qty+1
}

:

item

);

}



return [

...prev,

{
...product,
qty:1
}

];


});



setAddedItems(prev=>({

...prev,

[product.id]:true

}));


};





return (

<Routes>



{/* =====================
ADMIN
===================== */}


<Route
path="/Admin01"
element={<AdminLogin />}
/>


<Route
path="/AdminDash"
element={<AdminDash />}
/>






{/* =====================
WEBSITE
===================== */}


<Route element={<WebsiteLayout />}>




<Route
path="/"
element={<Home />}
/>





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

path="/shop"

element={


<ProtectedRoute>


<Store

cart={cart}

onAdd={handleAddItem}

addedItems={addedItems}

/>


</ProtectedRoute>


}

/>






<Route

path="/cart"

element={


<ProtectedRoute>


<Cart

cart={cart}

setCart={setCart}

/>


</ProtectedRoute>


}

/>






<Route

path="/signin"

element={<Signin />}

/>






<Route

path="/user"

element={<UserPanel />}

/>





</Route>







{/* =====================
404
===================== */}


<Route

path="*"

element={<NotFound />}

/>



</Routes>

);


};


export default App;