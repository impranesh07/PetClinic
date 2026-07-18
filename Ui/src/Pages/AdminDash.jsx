import React, { useState } from 'react';
import AdminLogin from '../Components/AdminLogin';
import AdminOverview from '../Components/AdminOverview';
import AdminDoctorM from '../Components/AdminDoctorM';
import AdminBookingre from '../Components/AdminBookingre';
import AdminServiceProvider from '../Components/AdminServiceProvider';
import AdminDoctorList from '../Components/AdminDoctorList';
import AdminaddPet from '../Components/AdminaddPet';
import AdminProductList from '../Components/AdminProductList';
import AdminBookings from '../Components/AdminBookings';
// Added List icon alongside other Lucide imports
import {
  TrendingUp,
  ShieldAlert,
  LogOut,
  Stethoscope,
  Inbox,
  HeartHandshake,
  Package,
  List,
  CalendarCheck
} from 'lucide-react';


const AdminDash = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('overview');

  const [metrics] = useState({ totalBookings: 124, activePatients: 84, registeredOwners: 51, monthlyRevenue: "₹48,500" });
  
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Sourav Banerjee", specialization: "Veterinary Surgeon", experience: "8 Years", timing: "Mon-Wed (10:00 AM - 2:00 PM)" },
    { id: 2, name: "Dr. Ananya Chatterjee", specialization: "Pet Dermatologist", experience: "5 Years", timing: "Thu-Sat (4:00 PM - 7:00 PM)" }
  ]);

  const [bookingRequests, setBookingRequests] = useState([
    { id: "REQ-901", ownerName: "Amit Sharma", petName: "Bruno (Labrador)", doctorRequested: "Dr. Sourav Banerjee", date: "2026-07-09", time: "11:30 AM", status: "Pending" },
    { id: "REQ-902", ownerName: "Pooja Das", petName: "Kitty (Persian Cat)", doctorRequested: "Dr. Ananya Chatterjee", date: "2026-07-10", time: "05:00 PM", status: "Pending" }
  ]);

  const [providers, setProviders] = useState([
    { id: 1, name: "Paws & Claws Deluxe Spa", type: "Pet Grooming", experience: "4 Years", contact: "9830012345", rate: "₹1,200", details: "Luxury herbal bathing and nail grinding." },
    { id: 2, name: "Barkley Resort & Boarding", type: "Pet Boarding", experience: "6 Years", contact: "9876543210", rate: "₹850", details: "24/7 air-conditioned private pet cabins." }
  ]);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row font-sans text-base-content">
      {/* Sidebar Layout */}
      <aside className="w-full lg:w-64 bg-base-100 border-b lg:border-b-0 lg:border-r border-base-300 p-4 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 border-b border-base-300 mb-6">
            <div className="p-2 bg-teal-500 rounded-xl text-white"><ShieldAlert size={24} /></div>
            <div>
              <h1 className="font-bold text-lg font-mono tracking-tight">Petify Control</h1>
              <span className="text-xs text-error font-semibold uppercase tracking-wider">Admin Console</span>
            </div>
          </div>
          <ul className="menu menu-md w-full p-0 gap-1 font-medium">
            <li>
              <button onClick={() => setCurrentView('overview')} className={currentView === 'overview' ? 'active bg-teal-500 text-white' : ''}>
                <TrendingUp size={18} /> Overview
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('doctors')} className={currentView === 'doctors' ? 'active bg-teal-500 text-white' : ''}>
                <Stethoscope size={18} /> Doctor Management
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('requests')} className={currentView === 'requests' ? 'active bg-teal-500 text-white' : ''}>
                <Inbox size={18} /> Booking Requests 
                <span className="badge badge-sm badge-error text-white font-bold">{bookingRequests.filter(r => r.status === 'Pending').length}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('services')} className={currentView === 'services' ? 'active bg-teal-500 text-white' : ''}>
                <HeartHandshake size={18} /> Care Services
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('doctorlist')} className={currentView === 'doctorlist'? 'active bg-teal-500 text-white': ''}>
                <Stethoscope size={18} /> Doctor List
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('addpet')} className={currentView === 'addpet' ? 'active bg-teal-500 text-white' : ''}>
                <Package size={18} /> Add Toy Product
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('productlist')} className={currentView === 'productlist' ? 'active bg-teal-500 text-white' : ''}>
                <List size={18} /> Toy Catalog
              </button>
            </li>
            <li>
  <button
    onClick={() => setCurrentView('bookings')}
    className={currentView === 'bookings' ? 'active bg-teal-500 text-white' : ''}
  >
    <CalendarCheck size={18} /> Service Bookings
  </button>
</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-base-300 mt-6 lg:mt-0">
          <button onClick={() => setIsAuthenticated(false)} className="btn btn-outline btn-error btn-sm w-full gap-2 font-semibold">
            <LogOut size={16} /> Secure Terminate
          </button>
        </div>
      </aside>

      {/* Dynamic Content Switching Hub */}
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        {currentView === 'overview' && (
          <AdminOverview metrics={metrics} doctorCount={doctors.length} />
        )}

        {currentView === 'doctors' && (
          <AdminDoctorM doctors={doctors} onAddDoctor={(newDoc) => setDoctors([...doctors, newDoc])} />
        )}

        {currentView === 'doctorlist' && (
          <AdminDoctorList doctors={doctors} />
        )}

        {currentView === 'requests' && (
          <AdminBookingre
            requests={bookingRequests}
            onStatusChange={(id, status) =>
              setBookingRequests(prev =>
                prev.map(r => r.id === id ? { ...r, status } : r)
              )
            }
          />
        )}

        {currentView === 'services' && (
          <AdminServiceProvider
            providers={providers}
            onAddProvider={(newProv) => setProviders([...providers, newProv])}
          />
        )}

        {currentView === 'addpet' && (
          <AdminaddPet />
        )}

        {currentView === 'productlist' && (
          <AdminProductList />
        )}

        {currentView === 'bookings' && (
  <AdminBookings /> )}
      </main>
    </div>
  );
};

export default AdminDash;