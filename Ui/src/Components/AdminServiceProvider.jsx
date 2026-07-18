import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, ShieldCheck, Image as ImageIcon, X, Trash2 } from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:5000/api/providers";

const AdminServiceProvider = () => {
  const [providers, setProviders] = useState([]);
  const [providerName, setProviderName] = useState('');
  const [serviceType, setServiceType] = useState('Pet Grooming');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [rate, setRate] = useState('');
  const [details, setDetails] = useState('');
  
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch providers');
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = (e) => {
    e.stopPropagation(); 
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // New function handling the DELETE workflow
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this service provider?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete provider");
        return;
      }

      alert(result.message || "Provider removed successfully");
      // Optimistically update UI or refresh data state
      await fetchProviders();
    } catch (error) {
      console.error('Error removing provider:', error);
      alert('Could not delete provider. Please verify backend state.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!providerName || !experience || !contact || !rate) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", providerName);
      formData.append("service_type", serviceType);
      formData.append("experience", experience);
      formData.append("contact", contact);
      formData.append("rate", rate);
      formData.append("details", details);

      if (photoFile) {
        formData.append("photo", photoFile);
      }
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formData, 
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        alert(result.message || "Backend Error");
        return;
      }

      alert(result.message);
      await fetchProviders();

      setProviderName("");
      setServiceType("Pet Grooming");
      setExperience("");
      setContact("");
      setRate("");
      setDetails("");
      setPhotoFile(null);
      setPhotoPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting provider information:', error);
      alert('Could not save provider. Please verify backend state.');
    } finally {
      setIsLoading(false);
    }
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
              
              {/* Photo Upload & Preview Box */}
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium text-xs">Provider Photo</span></label>
                
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden" 
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-base-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-base-200/50 transition-all overflow-hidden relative group"
                >
                  {photoPreview ? (
                    <>
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-all"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center space-y-1 p-2">
                      <ImageIcon className="mx-auto text-base-content/40" size={24} />
                      <span className="text-xs font-medium text-base-content/60 block">Click to upload image</span>
                    </div>
                  )}
                </div>
              </div>

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

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn bg-teal-500 hover:bg-teal-600 border-none text-white w-full font-bold btn-sm h-10 disabled:bg-base-300"
              >
                {isLoading ? 'Registering...' : 'Register Provider'}
              </button>
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
              <div key={prov.id} className="card bg-base-100 border border-base-300 shadow-sm hover:border-teal-500 transition-all relative group">
                <div className="card-body p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {prov.photo ? (
                        <img 
                          src={prov.photo} 
                          alt={prov.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-teal-100 shrink-0" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg shrink-0">
                          {prov.name ? prov.name.charAt(0).toUpperCase() : 'P'}
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-bold text-base text-teal-600 line-clamp-1">{prov.name}</h4>
                        <span className="text-xs font-semibold bg-base-200 text-base-content/70 px-2 py-0.5 rounded-md mt-1 inline-block">{prov.service_type || prov.type}</span>
                      </div>
                    </div>
                    
                    {/* Updated Action Side containing Status & Delete Button */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="badge badge-sm badge-success text-white py-2 gap-1"><ShieldCheck size={12}/> Active</span>
                      <button 
                        onClick={() => handleDelete(prov.id)}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Delete Provider"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-base-content/70 italic bg-base-200/40 p-2 rounded-lg border border-base-200">
                    "{prov.details}"
                  </p>

                  <div className="text-xs space-y-1 pt-2 border-t border-base-200 text-base-content/80 grid grid-cols-2 gap-1">
                    <p><strong>Experience:</strong> {prov.experience} Years</p>
                    <p><strong>Base Cost:</strong> <span className="text-teal-600 font-bold">₹{prov.rate}</span></p>
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