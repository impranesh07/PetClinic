import React, { useState } from 'react';
import { PlusCircle, ShieldCheck } from 'lucide-react';

const AdminServiceProvider = ({ providers, onAddProvider }) => {
  const [providerName, setProviderName] = useState('');
  const [serviceType, setServiceType] = useState('Pet Grooming');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [rate, setRate] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!providerName || !experience || !contact || !rate) return;

    onAddProvider({
      id: providers.length + 1,
      name: providerName,
      type: serviceType,
      experience: `${experience} Years`,
      contact: contact,
      rate: `₹${rate}`,
      details: details || "No extra notes provided."
    });

    // Reset input fields
    setProviderName('');
    setExperience('');
    setContact('');
    setRate('');
    setDetails('');
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Pet Care Service Directory</h2>
        <p className="text-sm text-base-content/60">Onboard verified pet handling agencies, groomers, and training specialists.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Registration Form Box */}
        <div className="card bg-base-100 shadow-sm border border-base-300 xl:col-span-1">
          <div className="card-body p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <PlusCircle className="text-teal-500" size={20} /> Onboard Provider
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Provider / Agency Name</span></label>
                <input type="text" placeholder="e.g., Happy Paws Grooming" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={providerName} onChange={(e)=>setProviderName(e.target.value)} required />
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Service Category</span></label>
                <select className="select select-bordered w-full bg-base-200 h-10 text-sm" value={serviceType} onChange={(e)=>setServiceType(e.target.value)}>
                  <option value="Pet Grooming">Pet Grooming & Spa</option>
                  <option value="Pet Boarding">Overnight Boarding / Stay</option>
                  <option value="Dog Walking">Daily Dog Walking</option>
                  <option value="Behavioral Training">Behavioral Pet Training</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Experience</span></label>
                  <input type="number" placeholder="Years" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={experience} onChange={(e)=>setExperience(e.target.value)} required />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Rate Amount (₹)</span></label>
                  <input type="number" placeholder="Cost" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={rate} onChange={(e)=>setRate(e.target.value)} required />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Contact / Phone Number</span></label>
                <input type="tel" placeholder="10-digit number" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={contact} onChange={(e)=>setContact(e.target.value)} required />
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Service Details & Scope</span></label>
                <textarea rows="2" placeholder="Describe inclusions (e.g., includes hair trim, nail clipping, hair drying)" className="textarea textarea-bordered w-full bg-base-200 text-sm p-2" value={details} onChange={(e)=>setDetails(e.target.value)}></textarea>
              </div>

              <button type="submit" className="btn bg-teal-500 hover:bg-teal-600 border-none text-white w-full font-bold btn-sm h-10">Register Provider</button>
            </form>
          </div>
        </div>

        {/* Present Active Providers List Layout */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
            <span className="font-bold text-md">Registered Active Service Partners</span>
            <span className="badge bg-teal-500 border-none text-white font-mono font-bold px-3">{providers.length} Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((prov) => (
              <div key={prov.id} className="card bg-base-100 border border-base-300 shadow-sm hover:border-teal-500 transition-all">
                <div className="card-body p-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-base text-teal-600">{prov.name}</h4>
                      <span className="text-xs font-semibold bg-base-200 text-base-content/70 px-2 py-0.5 rounded-md">{prov.type}</span>
                    </div>
                    <span className="badge badge-sm badge-success text-white py-2 gap-1"><ShieldCheck size={12}/> Active</span>
                  </div>
                  
                  <p className="text-xs text-base-content/70 italic bg-base-200/40 p-2 rounded-lg border border-base-200">
                    "{prov.details}"
                  </p>

                  <div className="text-xs space-y-1 pt-2 border-t border-base-200 text-base-content/80 grid grid-cols-2 gap-1">
                    <p><strong>Experience:</strong> {prov.experience}</p>
                    <p><strong>Base Cost:</strong> <span className="text-teal-600 font-bold">{prov.rate}</span></p>
                    <p className="col-span-2"><strong>Contact Support:</strong> {prov.contact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceProvider;