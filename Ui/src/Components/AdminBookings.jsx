import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [recentUpdatedId, setRecentUpdatedId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      triggerBanner("Failed to load bookings from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const triggerBanner = (message, type = "success") => {
    setNotification(message);
    setTimeout(() => setNotification(""), 4000);
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking");
      }

      // Highlight the targeted row to indicate success visually
      setRecentUpdatedId(id);
      triggerBanner(`Booking ID #${id} marked as ${status} successfully.`);

      // Optimistic UI updates
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: status } : b))
      );

      // Fade out the target row color pulse effect after 2 seconds
      setTimeout(() => setRecentUpdatedId(null), 2000);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you absolutely sure you want to delete this booking record?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete request dropped by server");
      
      triggerBanner(`Booking record #${id} successfully purged.`);

      // Remove item locally
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      
      {/* Dynamic Action Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl font-medium text-sm animate-bounce flex items-center gap-2 border border-gray-800">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Booking Management
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Provider</th>
              <th>Contact</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 font-medium text-gray-400">
                  No Bookings Found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const isConfirmed = booking.status?.toLowerCase() === "confirmed";
                const isRecentlyChanged = recentUpdatedId === booking.id;

                return (
                  <tr 
                    key={booking.id} 
                    className={`transition-all duration-500 hover:bg-gray-50/50 ${
                      isRecentlyChanged ? "bg-green-50 text-green-900 font-medium" : ""
                    }`}
                  >
                    <td className="font-semibold text-gray-700">{booking.id}</td>
                    <td className="font-medium text-gray-800">{booking.provider_name}</td>
                    <td>{booking.contact}</td>
                    <td className="font-semibold text-gray-900">₹{booking.amount}</td>
                    <td>
                      <span 
                        className={`badge badge-sm font-bold capitalize transition-all duration-300 ${
                          isConfirmed 
                            ? "badge-success text-white scale-105" 
                            : "badge-warning text-gray-800"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="text-sm text-gray-500">{booking.booking_date}</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {!isConfirmed && (
                          <button
                            className="btn btn-success btn-xs text-white px-2.5 font-bold transition-transform active:scale-95"
                            onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          className="btn btn-error btn-xs text-white px-2.5 font-bold transition-transform active:scale-95"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;