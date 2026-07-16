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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const vaccineOptions = ["Rabies", "DHPP (9-in-1)", "Parvovirus", "Distemper", "FVRCP", "Leptospirosis"];

  // Handle generic text/date/select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Explicitly reset form data fields back to baseline states
  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      breed: '',
      gender: 'male',
      date: '',
      vaccine: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validations before triggering network requests
    if (!formData.name || !formData.date || !formData.vaccine) {
      alert("Please fill out all required fields (Pet Name, Date, and Vaccine).");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://127.0.0.1:5000/api/vaccination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           pet_name: formData.name,
           age: formData.age,
           breed: formData.breed,
           gender: formData.gender,
           preferred_date: formData.date,
           vaccine: formData.vaccine
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Vaccine appointment booked successfully!");
        resetForm();
      } else {
        alert(data.error || "Failed to book appointment. Please check your details.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Unable to connect to the server. Please check your backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="box w-full sm:w-10/12 md:w-2/3 lg:w-1/2 h-auto">
        <div className="block w-full bg-blue-100 border-2 border-black rounded-lg shadow-lg p-6">
          
          <div className="boldtext flex justify-center mb-6">
            <h1 className='text-2xl md:text-3xl font-semibold'>Get Vaccine</h1>
          </div>

          <div className="content">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Responsive Grid for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Pet Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered input-sm w-full bg-white" 
                    placeholder="Buddy" 
                    required 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium">Age</label>
                  <input 
                    type="text" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input input-bordered input-sm w-full bg-white" 
                    placeholder="e.g. 2 years" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Breed</label>
                <input 
                  type="text" 
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="input input-bordered input-sm w-full bg-white" 
                />
              </div>

              {/* Controlled Radio Inputs */}
              <div className="gender flex items-center gap-4 py-2">
                <p className="font-medium">Gender:</p>
                <label className="flex items-center gap-1 cursor-pointer">
                  <span>Male</span>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="radio radio-success radio-sm" 
                  />
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <span>Female</span>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="radio radio-success radio-sm" 
                  />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Preferred Date *</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-white" 
                  required 
                />
              </div>

              {/* Combobox Implementation */}
              <div className="vaccinename flex flex-col gap-1">
                <label className="font-medium">Select Vaccine *</label>
                <input 
                  list="vaccine-options" 
                  name="vaccine"
                  value={formData.vaccine}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-white" 
                  placeholder="Search or select vaccine..."
                  required
                />
                <datalist id="vaccine-options">
                  {vaccineOptions.map((v, i) => (
                    <option key={i} value={v} />
                  ))}
                </datalist>
              </div>    

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-block btn-info text-white flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div> 
            </form>
          </div>
        </div>
      </div>            
    </div>
  );
};

export default Vaccineservice;