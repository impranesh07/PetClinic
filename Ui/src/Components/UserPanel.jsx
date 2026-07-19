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
        const [bookingsRes, vaccineRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/bookings`),
          fetch(`http://127.0.0.1:5000/api/vaccination`).catch(() => null)
        ]);

        let combinedData = [];

        if (bookingsRes && bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          combinedData = [...combinedData, ...bookingsData];
        }

        if (vaccineRes && vaccineRes.ok) {
          const vaccineData = await vaccineRes.json();
          const normalizedVaccines = vaccineData.map(v => ({
            id: `vac-${v.id || v._id}`,
            user_id: v.user_uid || v.user_id, 
            user_email: v.user_email || user.email,
            contact: v.contact,
            provider_name: `💉 Vaccine: ${v.vaccine} (${v.pet_name})`,
            booking_date: v.preferred_date || v.date,
            status: v.status || "Pending"
          }));
          combinedData = [...combinedData, ...normalizedVaccines];
        }
        
        const userSpecificData = combinedData.filter((booking) => {
          const matchesContact = user.contact && booking.contact === user.contact;
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
    // Changed flex direction to row and structured elements into a two-column grid layout
    <div className="fixed right-6 top-24 w-[650px] z-40 flex gap-4 antialiased items-start">
      
      {/* 1. STANDALONE SERVICE BOOKINGS TRACKER (NOW LEFT SIDE) */}
      <div className="flex-1 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Recent Bookings
          </h3>
          {bookings.length > 0 && (
            <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {bookings.length}
            </span>
          )}
        </div>
        
        {loadingBookings ? (
          <div className="space-y-2 py-2">
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-100">
            <p className="text-xs text-gray-400 font-medium italic">
              No recent bookings placed.
            </p>
          </div>
        ) : (
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {bookings.map((b) => {
              const statusLower = b.status?.toLowerCase();
              const isConfirmed = statusLower === "confirmed" || statusLower === "approved";
              const isCancelled = statusLower === "cancelled" || statusLower === "rejected";

              return (
                <div 
                  key={b.id} 
                  className={`flex justify-between items-center text-xs p-3 rounded-xl border transition-all hover:bg-white ${
                    isCancelled 
                      ? "bg-red-50/10 border-red-100/70" 
                      : isConfirmed
                      ? "bg-green-50/10 border-green-100/70"
                      : "bg-gray-50/50 border-gray-100"
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p className={`font-semibold text-gray-700 text-xs tracking-tight ${isCancelled ? "line-through text-gray-400" : ""}`}>
                      {b.provider_name}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400 mt-0.5">
                      {b.booking_date}
                    </p>
                  </div>
                  
                  <span 
                    className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wide ${
                      isConfirmed 
                        ? "bg-green-50 text-green-700 border border-green-100" 
                        : isCancelled 
                        ? "bg-red-50 text-red-700 border border-red-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
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

      {/* 2. MAIN PROFILE CARD (NOW RIGHT SIDE) */}
      <div className="w-72 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-gray-100 transition-all duration-300 hover:shadow-2xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-gray-50 object-cover shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-gray-800 text-base tracking-tight truncate">{user.name}</h2>
            <p className="text-xs text-gray-400 font-medium truncate">{user.email}</p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

        {/* NAVIGATION ACTIONS */}
        <div className="space-y-2">
          <button
            onClick={() => navigate("/user")}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium text-xs rounded-xl transition-all active:scale-[0.98] bg-gray-50/50 hover:bg-gray-50"
          >
            👤 My Profile
          </button>

          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl transition-all active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserPanel;