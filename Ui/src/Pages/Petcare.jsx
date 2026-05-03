import React, { useState } from 'react'
import care from '../Images/pet_care.jpg'
import data from '../Images/doctor.jpg'

const Petcare = () => {
  // 1. State to track selections: { index: price }
  // Example: { 0: 100, 1: 1000 }
  const [selectedPlans, setSelectedPlans] = useState({});

  const care_data = [
    {
      "id": 101,
      "name": "Sarah Jenkins",
      "image": data,
      "contact": "+1-555-0123",
      "years_experience": 5,
      "rating": 4.9,
      "daily_rate": 100,
      "monthly_rate": 1000,
      "bio": "Certified veterinary technician with a love for energetic dogs."
    },
    {
      "id": 102,
      "name": "Marcus Chen",
      "image": data,
      "contact": "+1-555-0456",
      "years_experience": 3,
      "rating": 4.7,
      "daily_rate": 100,
      "monthly_rate": 1000,
      "bio": "Specialized in cat sitting and grooming for shy or anxious pets."
    }
  ]

  const handlePlanSelect = (index, price) => {
    setSelectedPlans(prev => ({ ...prev, [index]: price }));
  };

  const handleBooking = (personName, index) => {
    const price = selectedPlans[index];
    if (!price) {
      alert("Please select a plan first!");
      return;
    }
    alert(`Booking Confirmed!\nName: ${personName}\nPrice: ₹${price}`);
  };

  return (
    <div className="main bg-amber-300 w-full">
      <div className="box w-full h-80 bg-red-600 overflow-hidden relative">
        <img src={care} className='h-full w-full object-cover' alt="care" />
        <div className="shade absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-100">
          <p className="text-7xl font-bold uppercase tracking-wider">Pet care</p>
        </div>
      </div>

      <div className="box bg-amber-50 p-16 w-full flex flex-col items-center">
        {care_data.map((e, index) => (
          <div className="card card-side bg-base-100 shadow-xl lg:w-1/2 mb-6 border border-base-200" key={index}>
            <figure className="w-48 h-auto shrink-0">
              <img src={e.image} alt={e.name} className="object-cover h-full w-full" />
            </figure>

            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-2xl">{e.name}</h2>
                <div className="badge badge-secondary">{e.years_experience} Years Exp</div>
              </div>

              <p className="text-sm text-gray-500">{e.contact}</p>
              <p className="mt-2 line-clamp-2">{e.bio}</p>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  {/* 1 Day Option */}
                  <div 
                    onClick={() => handlePlanSelect(index, 100)}
                    className={`p-2 rounded-lg flex-1 text-center border cursor-pointer transition-all ${selectedPlans[index] === 100 ? 'bg-primary text-white border-primary' : 'bg-base-200 border-primary/20'}`}
                  >
                    <span className="block text-xs font-bold uppercase">1 Day</span>
                    <span className="text-lg font-bold">₹100</span>
                  </div>

                  {/* 30 Days Option */}
                  <div 
                    onClick={() => handlePlanSelect(index, 1000)}
                    className={`p-2 rounded-lg flex-1 text-center border cursor-pointer transition-all ${selectedPlans[index] === 1000 ? 'bg-secondary text-white border-secondary' : 'bg-base-200 border-secondary/20'}`}
                  >
                    <span className="block text-xs font-bold uppercase">30 Days</span>
                    <span className="text-lg font-bold">₹1000</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-2">
                  <button 
                    onClick={() => handleBooking(e.name, index)}
                    className="btn btn-primary btn-sm px-8"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Petcare