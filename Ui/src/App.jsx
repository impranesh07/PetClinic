import React from 'react'
import Header1 from './Components/Header1'
import Footer from './Components/Footer'
import { Routes } from 'react-router-dom'
import Home from './Pages/index'
import { Route } from 'react-router-dom'
import Petreg from './Pages/Petreg'
import Appoin from './Pages/Bookappoinment'
import Petcare from './Pages/Petcare'

const App = () => {
  return (
    <div className="box bg-amber-50">
     <Header1/> 
     <div className=''>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='Petreg' element={<Petreg/>}/>
        <Route path='/appoin' element={<Appoin/>} />
        <Route path='/petcare' element={<Petcare/>} />
       </Routes>
     </div>
     <Footer/>
    </div>
  )
}

export default App
