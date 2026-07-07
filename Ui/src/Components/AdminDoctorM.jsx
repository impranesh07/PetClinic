import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const AdminDoctorM = ({ doctors, onAddDoctor }) => {
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('General Veterinary');
  const [docExp, setDocExp] = useState('');
  const [docTiming, setDocTiming] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docName || !docExp || !docTiming) return;

    onAddDoctor({
      id: doctors.length + 1,
      name: docName,
      specialization: docSpec,
      experience: `${docExp} Years`,
      timing: docTiming
    });

    setDocName('');
    setDocExp('');
    setDocTiming('');
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Doctor Directory</h2>
        <p className="text-sm text-base-content/60">Register medical staff profiles and configure consultation hours.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Form panel */}
        <div className="card bg-base-100 shadow-sm border border-base-300 xl:col-span-1">
          <div className="card-body p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <PlusCircle className="text-teal-500" size={20} /> Add New Medical Expert
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Doctor Name</span></label>
                <input type="text" placeholder="Dr. Full Name" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={docName} onChange={(e)=>setDocName(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Specialization</span></label>
                <select className="select select-bordered w-full bg-base-200 h-10 text-sm" value={docSpec} onChange={(e)=>setDocSpec(e.target.value)}>
                  <option value="General Veterinary">General Veterinary</option>
                  <option value="Veterinary Surgeon">Veterinary Surgeon</option>
                  <option value="Pet Dermatologist">Pet Dermatologist</option>
                  <option value="Avian/Exotic Specialist">Avian/Exotic Specialist</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Years of Experience</span></label>
                <input type="number" placeholder="e.g., 5" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={docExp} onChange={(e)=>setDocExp(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Checking Date and Timing</span></label>
                <input type="text" placeholder="e.g., Mon-Wed (10:00 AM - 2:00 PM)" className="input input-bordered w-full bg-base-200 h-10 text-sm" value={docTiming} onChange={(e)=>setDocTiming(e.target.value)} required />
              </div>
              <button type="submit" className="btn bg-teal-500 hover:bg-teal-600 border-none text-white w-full font-bold btn-sm h-10">Add Doctor Status</button>
            </form>
          </div>
        </div>

        {/* Directory grid */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
            <span className="font-bold text-md">On-Duty Experts Present Now</span>
            <span className="badge bg-teal-500 border-none text-white font-mono font-bold px-3">{doctors.length} Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="card bg-base-100 border border-base-300 shadow-sm hover:border-teal-500 transition-colors">
                <div className="card-body p-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-base text-teal-600">{doc.name}</h4>
                      <span className="text-xs font-semibold bg-base-200 text-base-content/70 px-2 py-0.5 rounded-md">{doc.specialization}</span>
                    </div>
                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">Present</span>
                  </div>
                  <div className="text-xs space-y-1 pt-2 border-t border-base-200 text-base-content/80">
                    <p><strong>Experience:</strong> {doc.experience}</p>
                    <p><strong>Available Schedule:</strong> {doc.timing}</p>
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

export default AdminDoctorM;