import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Box, AlertCircle, Loader2 } from 'lucide-react';

const AdminProductList = () => {
  // 1. Initialize empty state for backend integration
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Replace this URL with your actual Flask server endpoint (e.g., http://127.0.0.1:5000/api/product)
  const API_BASE_URL = '/api/product';

  // 2. Fetch products on initial mount
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

  // 3. Handle product deletion with real backend Sync
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this toy from the store?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product from the database.");
      }

      // Optimistically update UI state after successful API deletion
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtered products list
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

        {/* 4. Network Status UI Layers (Loading & Error States) */}
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
          /* Product Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200">
                <div>
                  {/* Toy Image Preview / Placeholder */}
                  <div className="h-48 bg-gray-100 relative flex items-center justify-center border-b border-base-300">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="text-5xl mb-1">🧸</span>
                        <span className="text-xs uppercase tracking-wider font-semibold">No Image Uploaded</span>
                      </div>
                    )}
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      product.status === "In Stock" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h2 className="text-lg font-bold text-base-content mt-2 line-clamp-1">{product.name}</h2>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
                      {product.description}
                    </p>

                    {/* Metadata details table */}
                    <div className="grid grid-cols-2 gap-y-2 pt-2 border-t border-base-200 text-xs text-base-content/70">
                      <div>
                        <span className="font-semibold text-gray-400 block uppercase tracking-tight">Material</span>
                        <span className="font-medium text-base-content">{product.material}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 block uppercase tracking-tight">Age Group</span>
                        <span className="font-medium text-base-content">{product.ageGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Actions footer */}
                <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-base-200 bg-base-50/50">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-extrabold text-base-content">₹{product.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button 
                      className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition"
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
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