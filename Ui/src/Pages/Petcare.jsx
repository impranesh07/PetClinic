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
        setLoading(false);
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
        user_id: user.uid,
        provider_id: provider.id,
        provider_name: provider.name,
        contact: provider.contact,
        amount: price,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
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
    <div className="main bg-amber-300 w-full min-h-screen pb-12">

      {/* Banner */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={care}
          alt="Pet Care"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-bold uppercase text-white tracking-wide">
            Pet Care
          </h1>
        </div>
      </div>

      {/* Cards Container */}
      {/* FIXED: Increased gap-4 to gap-6 for more space between the cards */}
      <div className="bg-amber-50 p-10 flex flex-col items-center gap-6">
        {careData.length === 0 ? (
          <h2 className="text-2xl font-bold text-gray-500 py-10">
            No Service Providers Found
          </h2>
        ) : (
          careData.map((e) => {
            const isSelected = selectedPlans[e.id] === e.rate;

            return (
              <div
                key={e.id}
                className="card card-side bg-white shadow-md w-full max-w-xl border border-gray-100 overflow-hidden h-40 rounded-xl hover:shadow-lg transition-shadow duration-200"
              >
                {/* Left Side Image Box */}
                <figure className="w-36 h-full shrink-0">
                  <img
                    src={e.photo}
                    alt={e.name}
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* Right Side Details Content */}
                {/* FIXED: Incremented internal padding slightly from p-3.5 to p-4 for breathing room */}
                <div className="p-4 flex flex-col justify-between flex-grow min-w-0">
                  
                  {/* Text Header Area */}
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <h2 className="card-title text-base font-bold text-gray-800 truncate">
                        {e.name}
                      </h2>
                      <div className="badge badge-primary badge-sm text-[10px] font-bold shrink-0 rounded px-1.5 py-0.5">
                        {e.experience} Yrs
                      </div>
                    </div>

                    {/* Description details space */}
                    <div className="text-xs space-y-1 text-gray-600">
                      <p className="truncate">
                        <span className="font-semibold text-gray-700">Service:</span> {e.service_type}
                      </p>
                      <p className="truncate">
                        <span className="font-semibold text-gray-700">Contact:</span> {e.contact}
                      </p>
                      <p className="text-gray-400 text-[11px] truncate mt-0.5">
                        {e.details}
                      </p>
                    </div>
                  </div>

                  {/* Operational Footer Area */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                    {/* Compact Interactive Rate Box */}
                    <div
                      onClick={() => handlePlanSelect(e.id, e.rate)}
                      className={`border rounded-lg px-3 py-1 text-center cursor-pointer transition-all duration-150 select-none ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                      }`}
                    >
                      <p className="text-[8px] uppercase tracking-wider font-bold opacity-75">
                        Rate
                      </p>
                      <p className="text-xs font-extrabold">
                        ₹{e.rate}
                      </p>
                    </div>

                    {/* Uniform Small Booking Button */}
                    <button
                      className="btn btn-primary btn-sm min-h-0 h-8 text-xs font-bold px-4 rounded-lg shadow-sm border-none"
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