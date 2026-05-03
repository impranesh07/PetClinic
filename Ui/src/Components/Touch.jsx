import React from 'react'
import facebook from '../Images/facebook.png'
import insta from '../Images/insta.png'
import twitter from '../Images/twitter.png'


const Touch = () => {
  return (
   <div className="desgin bg-blue-100 rounded-4xl h-full lg:w-1/2 w-full p-4 text-center">
      <form>
        <div className="name pb-4">
            <input type="text" placeholder="Full name" 
            className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]"
            />
        </div>
        <div className="mail pb-4">
         <input type="text" placeholder="E-mail" 
          className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]"
         />
        </div>
        <div className="message pb-4">
         <input type="text" placeholder="Message" 
          className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]" 
         />
        </div>
        
        <div className="click pt-3">
         <button className="btn btn-success rounded-3xl font-mono text-[20px]">contact us</button>  
        </div>
      </form>
      <div className="icons  w-full p-3 flex gap-4 justify-center">
          <div className="facebook h-10 ">
            <img src={facebook} className='h-full object-cover' />
          </div>
          <div className="facebook h-10 ">
            <img src={insta} className='h-full object-cover' />
          </div>
          <div className="facebook h-10">
            <img src={twitter} className='h-full object-cover' />
          </div>
      </div>
   </div>
  )
}

export default Touch