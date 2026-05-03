import React, { useState } from 'react'
import regpet from '../Images/regpet.jpg'
const Petreg = () => {
  {/*  handle cases */}
  const [name, setname] = useState('')
  const [age, setage] = useState('')
  const [color, setcolor] = useState('')
  const [address, setaddress] = useState('')
  const [gen, setgen] = useState('')
 
  {/*  store all data into an object and use a usestate array to handle it */}

  
 
  const [regdata, setregdata] = useState([])

  const data={
    name:name,
    age:age,
    color:color,
    address:address,
    gen:gen
  }

   function prevent(p) {
    p.preventDefault();

     setregdata([...regdata,data])
     console.log(regdata);
   }

  return (
    <div className="main bg-blue-50 lg:flex h-screen w-full p-3">

      <div className="leftbox lg:h-full lg:w-1/2 h-[40%] w-full lg:p-3">
         <img src={regpet} className='h-full w-full object-cover overflow-hidden' />
      </div>
      <div className="rightbox lg:h-full lg:w-1/2 lg:p-6 h-[60%] w-full">
       <div className="box h-[80vh] w-full lg:p-3 rounded-4xl">
             <div className="text p-3 text-center ">
               <h1 className='text-4xl font-bold tracking-wide'>Register Pet</h1>
             </div>
             <div className="submit_from w-[70%] lg:p-9 ">
              {/*  form data */}
                 <form className=' p-3' onSubmit={prevent}>
                <div className="name flex gap-3">
                   <span className='lg:font-semibold'>Pet_Name:-</span>
                   <input type="text" className="input-lg  bg-amber-50 rounded-md border-2 border-black " placeholder=' name' 
                    value={name}
                   onChange={(e)=>{
                     setname(e.target.value)
                    }}
                   />
                </div>
                <div className="age flex gap-3 p-3">
                  <span className='lg:font-semibold'>Pet_Age:-</span>
                  <input type="text" className="input-lg bg-amber-50 rounded-md border-2 border-black" placeholder=' age'
                  value={age}
                  onChange={(a)=>{
                  setage(a.target.value)
                  }}
                  />
                </div>
                <div className="gender p-1 flex gap-3">
                    <sapan className='font-semibold'>Gender</sapan>
                  Male<input type="radio" name="radio-1" value="Male" className="radio"
                   onChange={(m)=>{
                     setgen(m.target.value)
                   }}
                  />
                  Female<input type="radio" name="radio-1" value="Female" className="radio" 
                  onChange={(fe)=>{
                    setgen(fe.target.value)
                  }}
                  />
                </div>
                 
                <div className="age flex gap-3 p-3">
                  <span className='lg:font-semibold'>Pet_Colour:-</span>
                  <input type="text" className="input-lg bg-amber-50 rounded-md border-2 border-black" placeholder=' colour' 
                  value={color}
                  onChange={(c)=>{
                    setcolor(c.target.value)
                  }}
                  />
                </div>

                 <div className="add flex gap-3">
                  <span className='font-semibold'>Address:-</span>
                  <textarea className="textarea" placeholder="Type Hare"
                  value={address}
                  onChange={(add)=>{
                   setaddress(add.target.value)
                  }}
                  ></textarea>
                 </div>
                  <div className=" p-4 pl-6 flex justify-center">
                       <button className="btn bg-green-700 text-amber-50 border-2 border-black">Submit</button>
                 </div>
            </form>
             </div>
       </div>
      </div>
    </div>
  )
}

export default Petreg