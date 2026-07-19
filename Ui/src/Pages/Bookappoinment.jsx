import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Phone, X } from 'lucide-react';

const Bookappoinment = () => {
  const [petDoctors, setPetDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for managing the laptop/desktop popup modal
  const [activeContact, setActiveContact] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors directory records.");
        }
        return response.json();
      })
      .then((data) => {
        setPetDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      });
  };

  const getImageUrl = (photoObj) => {
    const rawPath = photoObj?.preview || photoObj;
    if (!rawPath) return "https://via.placeholder.com/150";
    
    if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
      return rawPath;
    }
    return `http://127.0.0.1:5000/uploads/${rawPath}`;
  };

  // Device Detection and Action Routing Logic
  const handleBookingAction = (e, doctorName, contactNumber) => {
    // Detect mobile devices (phones and tablets)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      // 1. STRICT DESKTOP BEHAVIOR: Prevent the default HTML anchor tag behavior 
      // (stops laptops from trying to open FaceTime, Skype, or phone links)
      e.preventDefault();
      
      // 2. Open the custom modal popup with the doctor's name and contact number
      setSelectedDoctorName(doctorName);
      setActiveContact(contactNumber);
    }
    // If it IS a mobile device, this function does nothing, 
    // allowing the default native 'tel:' link to trigger the phone dialer.
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-xl mx-auto mt-6 shadow">
        <span>⚠️ Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="ba w-full p-4 antialiased relative">
      <div className="doctors p-3 flex flex-col gap-6 justify-center items-center">
        
        {petDoctors.length === 0 ? (
          <div className="card bg-base-100 shadow border border-base-300 max-w-xl w-full">
            <div className="card-body text-center py-10">
              <h3 className="text-lg font-semibold text-gray-400 italic">No Doctors Available</h3>
            </div>
          </div>
        ) : (
          petDoctors.map((doctor) => (
            <div 
              className="card card-side bg-base-100 shadow-sm w-[45%] h-52 overflow-hidden border border-base-200 hover:shadow-md transition-all duration-200" 
              key={doctor.id || doctor._id}
            >
              <figure className='w-[30%] shrink-0 h-full bg-base-50'>
                <img 
                  className='w-full h-full object-cover' 
                  src={getImageUrl(doctor.photo)} 
                  alt={doctor.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </figure>

              <div className="card-body p-4 justify-between min-w-0">
                <div>
                  <h2 className="card-title text-base font-bold text-gray-800 truncate">
                    {doctor.name}
                  </h2>
                  
                  <div className="text-xs space-y-1 text-gray-600 mt-2">
                    <p className="truncate">
                      <span className='font-bold text-gray-700'>Spe: </span>
                      {doctor.specialization || doctor.specialist}
                    </p>
                    <p className="truncate">
                      <span className='font-bold text-gray-700'>Timing: </span>
                      {doctor.timing}
                    </p>
                    <p className="truncate">
                      <span className='font-bold text-gray-700'>Exp: </span>
                      {doctor.experience}
                    </p>
                  </div>
                </div>
                
                {/* Click action configuration for explicit device routing */}
                <div className="card-actions justify-end mt-2">
                  <a 
                    href={`tel:${doctor.contact}`} 
                    onClick={(e) => handleBookingAction(e, doctor.name, doctor.contact)}
                    className="no-underline"
                  >
                    <button className="btn btn-success btn-sm rounded-xl text-white font-medium flex items-center gap-1.5 px-4 shadow-sm">
                      BOOK APPOINTMENT 
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* LAPTOP / DESKTOP POPUP MODAL */}
      {activeContact && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-gray-100 relative">
            
            {/* Close Cross Button */}
            <button 
              onClick={() => setActiveContact(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mt-2">
              <div className="w-12 h-12 bg-green-50 rounded-full flex justify-center items-center mx-auto mb-3 text-green-600">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-800 tracking-tight">
                Appointment Desk
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Connect with {selectedDoctorName}
              </p>
              
              {/* Selectable Number Presentation Container */}
              <div className="my-5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-lg font-extrabold text-gray-700 select-all block tracking-wide">
                  {activeContact}
                </span>
              </div>
              
              <p className="text-[10px] text-gray-400 font-medium leading-normal mb-1">
                Please dial this number on your mobile phone to complete your pet's appointment verification steps.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookappoinment;