import React from 'react';
import { Check, X } from 'lucide-react';

const AdminBookingre = ({ requests, onStatusChange }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Booking Tickets Received</h2>
        <p className="text-sm text-base-content/60">Review and authorize client requests for clinical consultations.</p>
      </header>

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="bg-base-200/60 text-sm">
                <th>Ticket ID</th>
                <th>Pet Owner</th>
                <th>Patient Details</th>
                <th>Assigned Specialist</th>
                <th>Requested Slot</th>
                <th className="text-center">Status Pipeline</th>
                <th className="text-right">Action Gate</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((req) => (
                <tr key={req.id} className="hover">
                  <td className="font-mono font-bold text-base-content/60">{req.id}</td>
                  <td className="font-semibold">{req.ownerName}</td>
                  <td className="font-medium text-info">{req.petName}</td>
                  <td className="font-medium">{req.doctorRequested}</td>
                  <td>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold">{req.date}</span>
                      <span className="text-base-content/60">{req.time}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge font-bold px-2.5 py-1 text-xs ${
                      req.status === 'Approved' ? 'badge-success text-white' :
                      req.status === 'Cancelled' ? 'badge-error text-white' : 'badge-warning text-amber-900'
                    }`}>{req.status}</span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => onStatusChange(req.id, 'Approved')}
                        disabled={req.status !== 'Pending'}
                        className="btn btn-square btn-ghost btn-xs text-success disabled:opacity-20"
                      ><Check size={18} /></button>
                      <button 
                        onClick={() => onStatusChange(req.id, 'Cancelled')}
                        disabled={req.status !== 'Pending'}
                        className="btn btn-square btn-ghost btn-xs text-error disabled:opacity-20"
                      ><X size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingre;