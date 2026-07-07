import React from 'react';
import { Calendar, Stethoscope, Users, DollarSign } from 'lucide-react';

const AdminOverview = ({ metrics, doctorCount }) => {
  return (
    <>
      <header>
        <h2 className="text-2xl font-bold tracking-tight">System Status</h2>
        <p className="text-sm text-base-content/60">Live metrics across Petify services.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stats shadow-sm border border-base-300 bg-base-100">
          <div className="stat">
            <div className="stat-figure text-teal-500"><Calendar size={28} /></div>
            <div className="stat-title font-medium text-base-content/70">Total Bookings</div>
            <div className="stat-value text-3xl mt-1">{metrics.totalBookings}</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-100">
          <div className="stat">
            <div className="stat-figure text-info"><Stethoscope size={28} /></div>
            <div className="stat-title font-medium text-base-content/70">On-Duty Doctors</div>
            <div className="stat-value text-3xl mt-1">{doctorCount}</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning"><Users size={28} /></div>
            <div className="stat-title font-medium text-base-content/70">Registered Owners</div>
            <div className="stat-value text-3xl mt-1">{metrics.registeredOwners}</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success"><DollarSign size={28} /></div>
            <div className="stat-title font-medium text-base-content/70">Monthly Revenue</div>
            <div className="stat-value text-3xl mt-1">{metrics.monthlyRevenue}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminOverview;