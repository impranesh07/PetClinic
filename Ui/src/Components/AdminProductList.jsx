import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Box, AlertCircle, Loader2 } from 'lucide-react';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_BASE_URL = "http://127.0.0.1:5000/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch inventory: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(err.message || "Something went wrong while loading the inventory.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this toy from the store?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product from the database.");
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const materialMatch = product.material?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = nameMatch || materialMatch;
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-base-content">
              📦 Toy Inventory Catalog
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track your Pet Store products, pricing, and availability.
            </p>
          </div>
          <div className="stats shadow bg-teal-50 text-teal-800 rounded-xl p-2 px-4 flex items-center gap-3">
            <Box size={24} className="text-teal-600" />
            <div>
              <div className="text-xs font-semibold opacity-70 uppercase">Total Products</div>
              <div className="text-xl font-bold">{products.length} Items</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by toy name or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-base-100 border border-base-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 text-base-content"
            />
          </div>

          <div className="flex items-center gap-2 bg-base-100 px-4 py-2 border border-base-300 rounded-xl">
            <Filter size={18} className="text-gray-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent outline-none font-medium text-sm text-base-content cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Dog">🐶 Dog</option>
              <option value="Cat">🐱 Cat</option>
              <option value="Fish">🐟 Fish</option>
              <option value="Bird">🦜 Bird</option>
              <option value="Small Pet">🐹 Small Pet</option>
            </select>
          </div>
        </div>

        {/* Network Status UI Layers */}
        {isLoading ? (
          <div className="bg-base-100 rounded-2xl p-16 text-center border border-base-300 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
            <p className="text-gray-500 text-sm font-medium">Fetching active toy inventory...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold">Database connection error</h3>
              <p className="text-sm opacity-90 mt-0.5">{error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-3 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-3 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Streamlined Product Grid */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="card card-side bg-base-100 max-h-44 shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition duration-200"
              >
                {/* Fixed Image Container to prevent layout collapse */}
                <div className="w-32 sm:w-40 shrink-0 h-full bg-base-200 relative border-r border-base-300">
                  {product.image && product.image.trim() !== "" ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        // Fallback fallback if the URL breaks or returns a 404
                        e.target.onerror = null; 
                        e.target.parentElement.innerHTML = `
                          <div class="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-base-200">
                            <span class="text-3xl mb-0.5">🧸</span>
                            <span class="text-[10px] uppercase tracking-wider font-semibold text-center px-1">Broken Link</span>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-base-200">
                      <span className="text-3xl mb-0.5">🧸</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-center px-1">No Image</span>
                    </div>
                  )}
                  {/* Status Badge inside image frame */}
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm z-10 ${
                    product.status === "In Stock" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {product.status}
                  </span>
                </div>

                {/* Condensed Core Body Text Area */}
                <div className="card-body p-3.5 justify-between min-w-0 flex-1">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider truncate">
                        {product.category}
                      </span>
                      <span className="text-base font-extrabold text-base-content shrink-0">
                        ₹{product.price}
                      </span>
                    </div>
                    
                    <h2 className="text-sm font-bold text-base-content truncate mt-1" title={product.name}>
                      {product.name}
                    </h2>
                    
                    <p className="text-xs text-gray-500 line-clamp-2 leading-tight">
                      {product.description}
                    </p>
                  </div>

                  {/* Metadata & Actions alignment row */}
                  <div className="flex items-center justify-between pt-2 border-t border-base-200 mt-1">
                    <div className="flex gap-x-3 text-[11px] text-base-content/70 truncate">
                      <span className="truncate">
                        <strong className="text-gray-400">Mat:</strong> {product.material || "N/A"}
                      </span>
                      <span className="shrink-0">
                        <strong className="text-gray-400">Age:</strong> {product.ageGroup || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button 
                        className="p-1.5 hover:bg-teal-50 text-teal-600 rounded-md transition"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-md transition"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-base-100 rounded-2xl p-12 text-center border border-base-300">
            <span className="text-5xl">🔍</span>
            <h3 className="font-bold text-lg mt-4 text-base-content">No products matched your search</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto text-sm">
              Try modifying your search criteria or resetting the category filter to see the available toys.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProductList;