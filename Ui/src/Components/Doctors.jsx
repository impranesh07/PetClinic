import React from 'react'
import Care from '../Images/care.jpg'
import emer from '../Images/emergency.jpg'
import vaccine from '../Images/vaccine.jpg'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {

  const navigate=useNavigate();

  const services=[
    {
      id:1,
      name:"Vaccination",
      image:vaccine,
      details:"A card component has a figure, a body part."
    },
    {
      id:2,
     name:"Emergency Service",
      image:emer,
      details:"A card component has a figure, a body part."
    },
    {
      id:3,
      name:"Pet Care",
      image:Care,
      details:"A card component has a figure, a body part."
    }
  ]
  
  return (
   <div className="main w-full p-2">
       <div className="service p-6 lg:flex gap-9 lg:justify-center  pl-11">
        {services.map((e,index)=>(
          <div className="card bg-base-100 w-60 shadow-sm card-xs border-2 border-gray-400
          mt-4 lg:m-0" key={index} >
           <figure className="p-3">
          <img src={e.image} loading="lazy"
      className="rounded-xl" />
    </figure>
       <div className="card-body items-center text-center">
       <h2 className="card-title">{e.name}</h2>
        <p>{e.details}</p>
         <div className="card-actions p-2">
          <button className="btn btn-success text-amber-50 font-mono"
         onClick={()=>{
          const val=e.id
          if (val===3) {
             navigate('/petcare')
          }
         }}
          >Get Service</button>
    </div>
     </div>
     </div>
        ))}
       </div>
   </div>
  )
}

export default Doctors