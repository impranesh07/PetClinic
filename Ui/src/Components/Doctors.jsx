import React from 'react'
import Care from '../Images/care.jpg'
import emer from '../Images/emergency.jpg'
import vaccine from '../Images/vaccine.jpg'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Vaccination",
      image: vaccine,
      details: "Keep your pets safe and healthy with up-to-date vaccinations and protective care routines."
    },
    {
      id: 2,
      name: "Emergency Service",
      image: emer,
      details: "24/7 urgent medical attention and critical care whenever your pet needs immediate help."
    },
    {
      id: 3,
      name: "Pet Care",
      image: Care,
      details: "Comprehensive wellness checkups, grooming, and personalized nutrition plans for your companion."
    }
  ]
  
  return (
    <div className="main w-full p-2">
      <div className="service p-6 lg:flex gap-9 lg:justify-center pl-11">
        {services.map((e) => (
          <div 
            className="card bg-base-100 w-60 shadow-sm card-xs border-2 border-gray-400 mt-4 lg:m-0" 
            key={e.id}
          >
            <figure className="p-3">
              <img 
                src={e.image} 
                alt={e.name} 
                loading="lazy" 
                className="rounded-xl" 
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold text-lg">{e.name}</h2>
              <p className="text-sm text-gray-600">{e.details}</p>
              <div className="card-actions p-2">
                <button 
                  className="btn btn-success text-amber-50 font-mono"
                  onClick={() => {
                    if (e.id === 3) navigate('/petcare');
                    else if (e.id === 1) navigate('/Vaccineservice');
                    else if (e.id === 2) navigate('/EmergencyServices');
                  }}
                >
                  Get Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors