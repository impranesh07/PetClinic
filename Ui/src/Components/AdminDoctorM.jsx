import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const AdminDoctorM = ({ doctors, onAddDoctor }) => {
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('General Veterinary');
  const [docExp, setDocExp] = useState('');
  const [docTiming, setDocTiming] = useState('');
  const [docPhoto, setDocPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setDocPhoto({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!docName || !docExp || !docTiming) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", docName);
    formData.append("specialization", docSpec);
    formData.append("experience", `${docExp} Years`);
    formData.append("timing", docTiming);

    if (docPhoto) {
      formData.append("photo", docPhoto.file);
    }

    const response = await fetch("http://127.0.0.1:5000/api/doctors", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      // Optional: update local state immediately
      onAddDoctor({
        id: Date.now(),
        name: docName,
        specialization: docSpec,
        experience: `${docExp} Years`,
        timing: docTiming,
        photo: docPhoto,
      });

      // Clear form
      setDocName("");
      setDocSpec("General Veterinary");
      setDocExp("");
      setDocTiming("");
      setDocPhoto(null);
    } else {
      alert(data.message || "Failed to add doctor.");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to the backend.");
  }
};
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">
          Doctor Directory
        </h2>

        <p className="text-sm text-base-content/60">
          Register medical staff profiles and configure consultation hours.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        <div className="card bg-base-100 shadow-sm border border-base-300 xl:col-span-1">

          <div className="card-body p-5">

            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <PlusCircle className="text-teal-500" size={20} />
              Add New Medical Expert
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Doctor Name */}

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs">
                    Doctor Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Dr. Full Name"
                  className="input input-bordered w-full bg-base-200 h-10 text-sm"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                />
              </div>

              {/* Upload Photo */}

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs">
                    Upload Doctor Photo
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full bg-base-200 text-sm"
                  onChange={handlePhotoChange}
                />

                {docPhoto && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={docPhoto.preview}
                      alt="Doctor Preview"
                      className="w-28 h-28 rounded-full object-cover border-2 border-teal-500"
                    />
                  </div>
                )}
              </div>

              {/* Specialization */}

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs">
                    Specialization
                  </span>
                </label>

                <select
                  className="select select-bordered w-full bg-base-200 h-10 text-sm"
                  value={docSpec}
                  onChange={(e) => setDocSpec(e.target.value)}
                >
                  <option value="General Veterinary">
                    General Veterinary
                  </option>

                  <option value="Veterinary Surgeon">
                    Veterinary Surgeon
                  </option>

                  <option value="Pet Dermatologist">
                    Pet Dermatologist
                  </option>

                  <option value="Avian/Exotic Specialist">
                    Avian/Exotic Specialist
                  </option>
                </select>
              </div>

              {/* Experience */}

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs">
                    Years of Experience
                  </span>
                </label>

                <input
                  type="number"
                  placeholder="e.g., 5"
                  className="input input-bordered w-full bg-base-200 h-10 text-sm"
                  value={docExp}
                  onChange={(e) => setDocExp(e.target.value)}
                  required
                />
              </div>

              {/* Timing */}

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs">
                    Checking Date and Timing
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="e.g., Mon-Wed (10:00 AM - 2:00 PM)"
                  className="input input-bordered w-full bg-base-200 h-10 text-sm"
                  value={docTiming}
                  onChange={(e) => setDocTiming(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn bg-teal-500 hover:bg-teal-600 border-none text-white w-full font-bold btn-sm h-10"
              >
                Add Doctor Status
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDoctorM;