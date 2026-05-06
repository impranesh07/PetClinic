import React, { useState } from 'react';

const Vaccineservice = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    gender: 'male',
    date: '',
    vaccine: ''
  });

  const vaccineOptions = ["Rabies", "DHPP (9-in-1)", "Parvovirus", "Distemper", "FVRCP", "Leptospirosis"];

  return (
    // Changed h-1/2 to min-h-screen to ensure it looks good on all devices
    <div className="main min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      
      {/* Box: Full width on mobile, 2/3 on tablet, 1/2 on desktop */}
      <div className="box w-full sm:w-10/12 md:w-2/3 lg:w-1/2 h-auto">
        
        {/* Container: Removed fixed h-[60vh] to allow content to expand on small screens */}
        <div className="block w-full bg-blue-100 border-2 border-black rounded-lg shadow-lg p-6">
          
          <div className="boldtext flex justify-center mb-6">
            <h1 className='text-2xl md:text-3xl font-semibold'>Get Vaccine</h1>
          </div>

          <div className="content">
            <form className="space-y-4">
              
              {/* Responsive Grid for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Pet Name</label>
                  <input type="text" className="input input-bordered input-sm w-full" placeholder="Buddy" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium">Age</label>
                  <input type="text" className="input input-bordered input-sm w-full" placeholder="e.g. 2 years" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Breed</label>
                <input type="text" className="input input-bordered input-sm w-full" />
              </div>

              <div className="gender flex items-center gap-4 py-2">
                <p className="font-medium">Gender:</p>
                <label className="flex items-center gap-1 cursor-pointer">
                  <span>Male</span>
                  <input type="radio" name="gender" className="radio radio-success radio-sm" defaultChecked />
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <span>Female</span>
                  <input type="radio" name="gender" className="radio radio-success radio-sm" />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Preferred Date</label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              {/* Combobox Implementation */}
              <div className="vaccinename flex flex-col gap-1">
                <label className="font-medium">Select Vaccine</label>
                <input 
                  list="vaccine-options" 
                  className="input input-bordered w-full" 
                  placeholder="Search or select vaccine..."
                  onChange={(e) => setFormData({...formData, vaccine: e.target.value})}
                />
                <datalist id="vaccine-options">
                  {vaccineOptions.map((v, i) => (
                    <option key={i} value={v} />
                  ))}
                </datalist>
              </div>    

              <div className="pt-4">
                <button type="submit" className="btn btn-block btn-info text-white">Book Appointment</button>
              </div> 
            </form>
          </div>
        </div>
      </div>            
    </div>
  )
}

export default Vaccineservice;