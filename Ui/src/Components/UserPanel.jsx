import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserBookings = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/bookings`);
        if (!response.ok) throw new Error("Failed to load booking history");
        const data = await response.json();
        
        const userSpecificData = data.filter((booking) => {
          const matchesContact = booking.contact === user.contact;
          const matchesId = booking.user_id === user.id || booking.user_id === user.uid;
          const matchesEmail = booking.user_email === user.email;

          return matchesContact || matchesId || matchesEmail;
        });

        setBookings(userSpecificData);
      } catch (error) {
        console.error("Error reading live booking flags:", error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchUserBookings();
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed right-5 top-24 w-80 z-40 space-y-4">
      
      {/* 1. MAIN PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-5 border">
        <div className="flex items-center gap-4">
          <img
            src={user.photo}
            alt="profile"
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg truncate">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        <div className="divider my-3"></div>

        {/* NAVIGATION ACTIONS */}
        <button
          onClick={() => navigate("/user")}
          className="w-full btn btn-outline btn-sm mb-2 rounded-xl"
        >
          👤 My Profile
        </button>

        <button
          onClick={logout}
          className="w-full btn btn-sm bg-red-600 text-white hover:bg-red-700 border-none rounded-xl shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* 2. STANDALONE SERVICE BOOKINGS TRACKER (OUTSIDE MAIN PROFILE CARD) */}
      <div className="bg-white shadow-xl rounded-2xl p-5 border">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Service Bookings
        </h3>
        
        {loadingBookings ? (
          <div className="flex justify-center py-2">
            <span className="loading loading-spinner loading-sm text-primary"></span>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-1">
            No recent bookings placed.
          </p>
        ) : (
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {bookings.map((b) => {
              const statusLower = b.status?.toLowerCase();
              const isConfirmed = statusLower === "confirmed";
              const isCancelled = statusLower === "cancelled";

              return (
                <div 
                  key={b.id} 
                  className={`flex justify-between items-center text-xs p-2 rounded-lg border transition-colors ${
                    isCancelled 
                      ? "bg-red-50/30 border-red-100 opacity-80" 
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className={`font-semibold text-gray-700 truncate ${isCancelled ? "line-through text-gray-400" : ""}`}>
                      {b.provider_name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {b.booking_date}
                    </p>
                  </div>
                  
                  {/* Dynamic Status Badge */}
                  <span 
                    className={`badge badge-xs font-bold shrink-0 p-1.5 uppercase tracking-wide rounded ${
                      isConfirmed 
                        ? "badge-success text-white" 
                        : isCancelled 
                        ? "badge-error text-white" 
                        : "badge-warning text-gray-800"
                    }`}
                  >
                    {b.status || "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default UserPanel;