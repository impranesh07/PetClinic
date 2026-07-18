import React, { useState } from "react";

const EmergencyServices = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchLocation.trim()) return;

    setLoading(true);
    setError("");

    try {
      // 1. First, convert the user's typed text location into standard coordinates (Geocoding)
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchLocation
      )}&format=json&limit=1`;

      const geoResponse = await fetch(geocodeUrl, {
        headers: { "User-Agent": "PetifyClinicApp/1.0" }
      });
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        setClinics([]);
        setError("Could not find coordinates for that location name.");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      // 2. Query the Overpass API to search for veterinary features within a 15km (15000m) radius
      // We explicitly request the data tags which contain phone records
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="veterinary"](around:15000, ${lat}, ${lon});
          way["amenity"="veterinary"](around:15000, ${lat}, ${lon});
        );
        out tags center;
      `;
      
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
      const response = await fetch(overpassUrl);
      
      if (!response.ok) throw new Error("Overpass data node structural failure.");
      const data = await response.json();

      if (data && data.elements && data.elements.length > 0) {
        const mappedClinics = data.elements.map((item) => {
          const tags = item.tags || {};
          
          // Fallback coordinate mapping because ways place points differently than single nodes
          const itemLat = item.lat || (item.center && item.center.lat) || lat;
          const itemLon = item.lon || (item.center && item.center.lon) || lon;

          // 3. Extract the metadata contact values safely
          return {
            id: item.id,
            name: tags.name || "Local Veterinary Clinic",
            location: tags["addr:full"] || 
                      [tags["addr:housenumber"], tags["addr:street"], tags["addr:suburb"], tags["addr:city"]]
                        .filter(Boolean)
                        .join(", ") || "Address listed on map directions",
            // Pulling dynamic business properties
            phone: tags.phone || tags["contact:phone"] || null,
            website: tags.website || tags["contact:website"] || null,
            lat: itemLat,
            lon: itemLon,
          };
        });
        
        setClinics(mappedClinics);
      } else {
        setClinics([]);
        setError("No nearby clinics with detailed data found within 15km of this area.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch detailed location records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        
        {/* HERO HEADER TEXT */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-red-600 shadow-sm animate-pulse">
            🚨 Deep Search Active (Includes Contact Details)
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Find Nearest Medical Care
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Locate veterinary centers, emergency contact lines, and mapping configurations near you completely free.
          </p>
        </div>

        {/* SEARCH INPUT BAR */}
        <div className="backdrop-blur-md bg-white/70 border border-slate-200/80 rounded-2xl p-6 max-w-2xl shadow-xl shadow-slate-100/40">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Target Search Location
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 text-base">
                🔍
              </span>
              <input
                type="text"
                placeholder="Enter your neighborhood or city (e.g., Salt Lake, Kolkata)..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input input-bordered w-full pl-11 pr-4 bg-white text-slate-800 border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all rounded-xl text-sm"
              />
            </div>
            <button 
              onClick={handleSearch} 
              className="btn bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-none font-bold px-7 rounded-xl shadow-md shadow-red-500/10 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs text-white"></span>
              ) : (
                "Search Radar"
              )}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-600 mt-3 font-semibold bg-red-50/50 p-2.5 rounded-lg border border-red-100/50">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* CARDS LIST SECTION */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              🏥 Discovered Medical Facilities 
              {clinics.length > 0 && (
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                  {clinics.length} Found
                </span>
              )}
            </h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <span className="loading loading-ring loading-lg text-red-500"></span>
              <p className="text-xs font-medium text-slate-400 tracking-wide animate-pulse">Scanning deep records...</p>
            </div>
          ) : clinics.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-16 text-center px-4 max-w-xl mx-auto">
              <span className="text-4xl mb-3">📞</span>
              <p className="text-sm font-semibold text-slate-700">Radar Inactive</p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Provide an active location above to search map nodes and retrieve direct calling metadata blocks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <div 
                  key={clinic.id} 
                  className="group flex flex-col justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                        {clinic.name}
                      </h4>
                      <span className="shrink-0 text-[10px] font-black tracking-wider uppercase text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                        Verified Area
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                        <span className="text-slate-400 font-bold">📍 Address:</span> {clinic.location}
                      </p>

                      {/* DYNAMIC PHONE SECTION */}
                      <p className="text-xs text-slate-700 font-medium bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center gap-2">
                        <span className="text-sm">📞</span>
                        {clinic.phone ? (
                          <a href={`tel:${clinic.phone}`} className="text-red-500 font-bold hover:underline">
                            {clinic.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic font-normal">No number listed on open maps</span>
                        )}
                      </p>

                      {/* DYNAMIC WEBSITE SECTION */}
                      {clinic.website && (
                        <p className="text-xs text-slate-600 line-clamp-1">
                          <span className="text-slate-400 font-bold">🌐 Web:</span>{" "}
                          <a href={clinic.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            {clinic.website.replace(/(^\w+:|^)\/\//, '')}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name + " " + clinic.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm bg-slate-50 group-hover:bg-red-500 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-red-500 font-bold px-4 rounded-xl shadow-none transition-all duration-300"
                    >
                      Directions ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmergencyServices;