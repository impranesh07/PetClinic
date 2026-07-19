import React, { useState, useEffect } from 'react';
import { Search, Filter, Box, AlertCircle, Loader2, ShoppingCart } from 'lucide-react';

// cart: Array of items currently in the cart
// onAdd: Function passed from App.js to handle adding an item to state/localstorage
// addedItems: Object mapping { productId: true } to keep track of what's already clicked
// onViewCart: Navigation function to open your checkout/cart route
const Shop = ({ cart = [], onAdd, addedItems = {}, onViewCart }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_BASE_URL = "http://127.0.0.1:5000/api/products";

  // Calculate actual aggregate items in the cart array safely
  const totalCartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

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
          
          {/* Top Navbar Action Utilities */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Clickable Cart Tracker */}
            <button 
              onClick={onViewCart}
              className="btn btn-md bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl flex items-center gap-2 shadow-sm normal-case relative"
            >
              <ShoppingCart size={18} />
              <span>View Cart</span>
              {totalCartCount > 0 && (
                <span className="badge badge-sm bg-rose-500 border-none text-white font-bold ml-1">
                  {totalCartCount}
                </span>
              )}
            </button>

            <div className="stats shadow bg-teal-50 text-teal-800 rounded-xl p-2 px-4 flex items-center gap-3">
              <Box size={24} className="text-teal-600" />
              <div>
                <div className="text-xs font-semibold opacity-70 uppercase">Total Products</div>
                <div className="text-xl font-bold">{products.length} Items</div>
              </div>
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
          /* Streamlined Smaller Product Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const isAlreadyAdded = !!addedItems[product.id];

              return (
                <div 
                  key={product.id} 
                  className="card card-side bg-base-100 max-h-32 shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition duration-200"
                >
                  {/* Fixed Image Container (Smaller size) */}
                  <div className="w-24 sm:w-28 shrink-0 h-full bg-base-200 relative border-r border-base-300">
                    {product.image && product.image.trim() !== "" ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.parentElement.innerHTML = `
                            <div class="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-base-200">
                              <span class="text-xl mb-0.5">🧸</span>
                              <span class="text-[8px] uppercase tracking-wider font-semibold text-center px-1">Broken Link</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-base-200">
                        <span className="text-xl mb-0.5">🧸</span>
                        <span className="text-[8px] uppercase tracking-wider font-semibold text-center px-1">No Image</span>
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold shadow-sm z-10 ${
                      product.status === "In Stock" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Condensed Core Body Text Area */}
                  <div className="card-body p-2.5 justify-between min-w-0 flex-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase tracking-wider truncate">
                          {product.category}
                        </span>
                        <span className="text-sm font-extrabold text-base-content shrink-0">
                          ₹{product.price}
                        </span>
                      </div>
                      
                      <h2 className="text-xs font-bold text-base-content truncate mt-0.5" title={product.name}>
                        {product.name}
                      </h2>
                      
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                        {product.description}
                      </p>
                    </div>

                    {/* Metadata & Actions alignment row */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-base-200 mt-0.5">
                      <div className="flex gap-x-2 text-[10px] text-base-content/70 truncate">
                        <span className="truncate">
                          <strong className="text-gray-400">Mat:</strong> {product.material || "N/A"}
                        </span>
                        <span className="shrink-0">
                          <strong className="text-gray-400">Age:</strong> {product.ageGroup || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center shrink-0 ml-2">
                        {/* Dynamic Button reflecting state updates */}
                        <button 
                          onClick={() => onAdd && onAdd(product)}
                          disabled={product.status === "Out of Stock"}
                          className={`btn btn-xs border-none text-white font-bold text-[10px] px-2.5 min-h-0 h-6 rounded-md ${
                            isAlreadyAdded 
                              ? "bg-emerald-600 hover:bg-emerald-700" 
                              : "bg-teal-600 hover:bg-teal-700"
                          } disabled:bg-base-300 disabled:text-gray-400`}
                        >
                          {product.status === "Out of Stock" 
                            ? "Out" 
                            : isAlreadyAdded 
                              ? "Added ✓" 
                              : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
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

export default Shop;