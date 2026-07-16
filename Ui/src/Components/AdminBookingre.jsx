import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

const AdminBookingre = () => {
  const [requests, setRequests] = useState([]);

  // Fetch vaccination requests
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/vaccination");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve / Reject
  const updateStatus = async (id, action) => {
    try {
      const endpoint =
        action === "Approved"
          ? `http://127.0.0.1:5000/api/vaccination/${id}/approve`
          : `http://127.0.0.1:5000/api/vaccination/${id}/reject`;

      const res = await fetch(endpoint, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        fetchRequests();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">
          Vaccination Booking Requests
        </h2>

        <p className="text-sm text-base-content/60">
          Review vaccination appointment requests.
        </p>
      </header>

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pet Name</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Preferred Date</th>
                <th>Vaccine</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.pet_name}</td>
                    <td>{req.age}</td>
                    <td>{req.breed}</td>
                    <td>{req.gender}</td>
                    <td>{req.preferred_date}</td>
                    <td>{req.vaccine}</td>

                    <td>
                      <span
                        className={`badge ${
                          req.status === "Approved"
                            ? "badge-success"
                            : req.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateStatus(req.id, "Approved")
                          }
                          disabled={req.status !== "Pending"}
                          className="btn btn-success btn-xs"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(req.id, "Rejected")
                          }
                          disabled={req.status !== "Pending"}
                          className="btn btn-error btn-xs"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    No vaccination requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingre;