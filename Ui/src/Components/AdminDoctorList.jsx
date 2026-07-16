import React, { useState, useEffect } from "react";
// Imported Trash2 icon for the delete button actions
import { Trash2 } from "lucide-react";

const AdminDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors on component load
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors data from backend.");
        }
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      });
  };

  // Handle deleting a doctor from the database
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this doctor profile?")) {
      fetch(`http://127.0.0.1:5000/api/doctors/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete doctor record.");
          }
          // Remove from local React state immediately on success
          setDoctors(doctors.filter((doc) => doc.id !== id));
        })
        .catch((err) => {
          alert(`Error deleting record: ${err.message}`);
        });
    }
  };

  // Helper function to guarantee safe image URLs
  const getImageUrl = (photoObj) => {
    const rawPath = photoObj?.preview || photoObj;
    if (!rawPath) return "https://via.placeholder.com/150";
    
    // If it's already a complete link, leave it as is
    if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
      return rawPath;
    }
    // If it's just a filename, route it to your Flask uploads endpoint
    return `http://127.0.0.1:5000/uploads/${rawPath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-base-content">Our Doctors</h2>
        <span className="badge bg-teal-500 text-white border-none px-4 py-3 font-semibold">
          {doctors.length} Doctors
        </span>
      </div>

      {doctors.length === 0 ? (
        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <h3 className="text-lg font-semibold">No Doctors Available</h3>
            <p className="text-base-content/60">
              Please add doctors from the Admin Panel.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="card bg-base-100 shadow border border-base-300 hover:shadow-lg transition-all relative group"
            >
              {/* Delete Button overlay on the top right corner of the card */}
              <button 
                onClick={() => handleDelete(doctor.id)}
                className="btn btn-circle btn-xs btn-error text-white absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Delete Profile"
              >
                <Trash2 size={14} />
              </button>

              <div className="card-body items-center text-center">
                <img
                  src={getImageUrl(doctor.photo)}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-teal-500"
                  onError={(e) => {
                    // Fallback fallback if the URL string still returns a 404
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />

                <h2 className="card-title mt-3 text-base-content">
                  {doctor.name}
                </h2>

                <span className="badge badge-outline text-base-content/80">
                  {doctor.specialization}
                </span>

                <div className="mt-4 text-sm space-y-2 w-full text-base-content">
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-70">Experience</span>
                    <span>{doctor.experience}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold opacity-70">Available</span>
                    <span className="text-right max-w-[60%] line-clamp-2">{doctor.timing}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDoctorList;