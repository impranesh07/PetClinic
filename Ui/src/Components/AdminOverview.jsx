import React from 'react';
import { Calendar, Stethoscope, Users, DollarSign } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

// Mock data tracking revenue trend over time
const revenueTrendData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 7500 },
];

// Mock data tracking booking distributions by pet type
const petDistributionData = [
  { name: 'Dogs', checkups: 120, vaccinations: 80 },
  { name: 'Cats', checkups: 90, vaccinations: 60 },
  { name: 'Birds', checkups: 30, vaccinations: 15 },
  { name: 'Exotics', checkups: 15, vaccinations: 10 },
];

const AdminOverview = ({ metrics = { totalBookings: 0, registeredOwners: 0, monthlyRevenue: '$0' }, doctorCount = 0 }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">System Status</h2>
        <p className="text-sm text-base-content/60">Live metrics across Petify services.</p>
      </header>

      {/* Metrics Row */}
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

      {/* Visual Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Performance Graph */}
        <div className="p-5 border border-base-300 bg-base-100 rounded-xl shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Revenue Progression</h3>
            <p className="text-xs text-base-content/60">Gross income analytics scaling across the last half-year.</p>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-base-300" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--fallback-b1, #1f2937)', border: '1px solid var(--fallback-b3, #374151)', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pet Treatment Demographics Chart */}
        <div className="p-5 border border-base-300 bg-base-100 rounded-xl shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Appointment Types by Pet Species</h3>
            <p className="text-xs text-base-content/60">Distribution comparison between clinical checkups and vaccine management.</p>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={petDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-base-300" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--fallback-b1, #1f2937)', border: '1px solid var(--fallback-b3, #374151)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="checkups" fill="#3b82f6" radius={[4, 4, 0, 0]} name="General Checkup" />
                <Bar dataKey="vaccinations" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Vaccination" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>
    </div>
  );
};

export default AdminOverview;