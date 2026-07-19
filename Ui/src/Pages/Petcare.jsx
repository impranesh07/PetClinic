import React, { useEffect, useState } from "react";
import care from "../Images/pet_care.jpg";

const Petcare = () => {
  const [careData, setCareData] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/providers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch providers");
        }
        return res.json();
      })
      .then((data) => {
        setCareData(data);
        loading && setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePlanSelect = (id, price) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [id]: price,
    }));
  };

  const handleBooking = async (provider) => {
    const price = selectedPlans[provider.id];

    if (!price) {
      alert("Please select a plan first!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch("http://127.0.0.1:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.uid || user?.id,
          provider_id: provider.id,
          provider_name: provider.name,
          contact: provider.contact,
          amount: price,
        }),
      });

      const data = await response.json();
      alert(data.message || "Booking processed");
    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-amber-50">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  return (
    // Cleaned up core layout wrapper to maintain consistency across the entire viewport
    <div className="w-full min-h-screen bg-amber-50/60 pb-12 antialiased">

      {/* Hero Banner Section */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={care}
          alt="Pet Care Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-white tracking-wider">
            Pet Care
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center gap-6">
        {careData.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-gray-400 italic">
              No Service Providers Found
            </h2>
          </div>
        ) : (
          careData.map((e) => {
            const isSelected = selectedPlans[e.id] === e.rate;

            return (
              <div
                key={e.id}
                className="flex bg-white shadow-md w-full max-w-xl border border-gray-100/80 overflow-hidden h-44 rounded-2xl hover:shadow-lg hover:border-gray-200/50 transition-all duration-300"
              >
                {/* Provider Profile Image Container */}
                <div className="w-36 h-full shrink-0 relative bg-gray-50">
                  <img
                    src={e.photo || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&h=150&q=80"}
                    alt={e.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col justify-between flex-grow min-w-0">
                  <div>
                    {/* Header Details */}
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h2 className="text-base font-bold text-gray-800 tracking-tight truncate">
                        {e.name}
                      </h2>
                      <span className="shrink-0 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 rounded-lg px-2 py-0.5">
                        {e.experience} Yrs Exp
                      </span>
                    </div>

                    {/* Metadata Specs */}
                    <div className="text-xs space-y-1 text-gray-600">
                      <p className="truncate">
                        <span className="font-semibold text-gray-500">Service:</span> {e.service_type}
                      </p>
                      <p className="truncate">
                        <span className="font-semibold text-gray-500">Contact:</span> {e.contact}
                      </p>
                      <p className="text-gray-400 text-[11px] leading-relaxed truncate mt-1">
                        {e.details}
                      </p>
                    </div>
                  </div>

                  {/* Operational Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 mt-2">
                    {/* Selectable Interactive Rate Selector */}
                    <div
                      onClick={() => handlePlanSelect(e.id, e.rate)}
                      className={`border rounded-xl px-3 py-1.5 text-center cursor-pointer transition-all duration-200 select-none min-w-[70px] ${
                        isSelected
                          ? "bg-amber-500 text-white border-amber-500 shadow-sm scale-[1.02]"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 hover:scale-[1.02]"
                      }`}
                    >
                      <p className="text-[8px] uppercase tracking-wider font-bold opacity-80">
                        Rate
                      </p>
                      <p className="text-xs font-extrabold">
                        ₹{e.rate}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      className="h-9 px-5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                      onClick={() => handleBooking(e)}
                    >
                      Book Now
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Petcare;