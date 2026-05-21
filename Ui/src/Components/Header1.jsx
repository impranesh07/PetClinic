import React from 'react'
import {Vegan } from 'lucide-react'
import {Link} from 'react-router-dom'
const Header1 = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky z-50 top-0">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <Link to='/'>Clinic</Link>
          <Link to='/shop'>Store</Link>
       <Link to='/appoin'>Book Appoinment</Link>
      </ul>
    </div>
    <div className="brand p-3 flex gap-3">
     <h4 className='text-green-600 text-2xl'><Vegan /></h4>
     <h6 className='text-[17px] font-mono'>Petify</h6>
    </div>
  

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1  font-bold text-[18px] gap-10">
       <Link to='/'>Clinic</Link>
       <Link to='/shop'>Store</Link>
       <Link to='/appoin'>Book Appoinment</Link>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn bg-green-700 text-amber-50 ">Sign in</a>
  </div>
</div>
  )
}

export default Header1
