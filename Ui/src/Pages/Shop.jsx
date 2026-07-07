import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// ─── DATA ──────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: 1, emoji: "Bone", brand: "Royal Canin", name: "Adult Dog Dry Food 3kg",       price: 1199, oldPrice: 1499, rating: 5, reviews: 284, tag: "Sale", tagColor: "bg-rose-500" },
  { id: 2, emoji: "Paw", brand: "Pedigree",    name: "Interactive Treat Puzzle Toy",  price: 799,                rating: 4, reviews: 97,  tag: "New",  tagColor: "bg-emerald-500" },
  { id: 3, emoji: "Cat", brand: "Whiskas",     name: "Wet Food Pouches — 12 Pack",    price: 649,                rating: 4, reviews: 203, tag: "New",  tagColor: "bg-violet-500" },
  { id: 4, emoji: "House", brand: "Catan Pets",  name: "Cozy Orthopedic Pet Bed — L",  price: 2299, oldPrice: 2899, rating: 5, reviews: 176 },
  { id: 5, emoji: "Tub", brand: "Himalaya",    name: "Tick Control Shampoo 200ml",    price: 349,                rating: 5, reviews: 512 },
  { id: 6, emoji: "Fish", brand: "Tetra",       name: "AquaArt Goldfish Aquarium 30L", price: 3499,               rating: 4, reviews: 88 },
];

const CATEGORIES = [
  { emoji: "Dog", name: "Dogs",      count: "420 items" },
  { emoji: "Cat", name: "Cats",      count: "310 items" },
  { emoji: "Bird", name: "Birds",     count: "150 items" },
  { emoji: "Fish", name: "Fish",      count: "200 items" },
  { emoji: "Hamster", name: "Small Pets",count: "130 items" },
  { emoji: "Turtle", name: "Reptiles",  count: "80 items" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", pet: "Dog mom to Bruno",   text: "PawHaven has completely changed how I shop for my Golden Retriever. Quality is outstanding!", avatar: "PS", color: "bg-amber-400" },
  { name: "Rahul Bose",   pet: "Cat dad to Mittens", text: "The grooming service was wonderful. My cat came back looking like actual royalty.",           avatar: "RB", color: "bg-violet-400" },
  { name: "Anjali Dey",   pet: "Fish & bird parent", text: "Best pet store in Siliguri, hands down. The free vet consult saved me so much stress!",       avatar: "AD", color: "bg-emerald-400" },
];

// ─── SHARED HELPERS ────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s<=rating?"text-amber-400":"text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

// ─── NAVBAR (shared) ───────────────────────────────────────────────────────
function Navbar({ cartCount }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/Cart')}
          className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── STORE PAGE ────────────────────────────────────────────────────────────
export default function Shop({ cart = [], onAdd, addedItems = {}, onCartClick }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  
  const cartCount = (cart || []).reduce((s, i) => s + i.qty, 0);

  const catMap = { Dogs:[0,1], Cats:[2], Birds:[], Fish:[5], "Small Pets":[], Reptiles:[] };
  const filtered = activeCategory !== null
    ? ALL_PRODUCTS.filter((_,i) => (catMap[CATEGORIES[activeCategory].name]||[]).includes(i))
    : ALL_PRODUCTS;
  const display = filtered.length > 0 ? filtered : ALL_PRODUCTS;

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div className="min-h-screen bg-gray-50" style={{fontFamily:"'Nunito',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Nunito:wght@300;400;500;600;700;800&display=swap'); .cg{font-family:'Cormorant Garamond',serif}`}</style>

      <Navbar cartCount={cartCount} onCartClick={onCartClick} onLogoClick={() => scrollTo("hero")} />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">

        {/* HERO */}
        <section id="hero" className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-amber-300 bg-amber-50 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-600 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> New arrivals every week
            </div>
            <h1 className="cg text-6xl md:text-7xl font-bold leading-none text-gray-900">
              Where Every<br/><span className="text-amber-500 italic">Pet</span> Feels<br/><span className="text-gray-400 font-semibold">Loved.</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-md font-light">
              Premium food, accessories & grooming — curated with love for every dog, cat, bird and fish in your family.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("products")} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors">
                Shop Now ✦
              </button>
              <button onClick={() => scrollTo("categories")} className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-medium px-8 py-3.5 rounded-xl text-sm transition-colors">
                Browse Categories →
              </button>
            </div>
            <div className="flex gap-8 pt-2">
              {[["12k+","Happy Pets"],["900+","Products"],["4.9★","Rating"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold cg text-amber-500">{v}</div>
                  <div className="text-xs text-gray-400 tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-amber-50 border border-amber-100"/>
              <div className="absolute inset-8 rounded-full bg-amber-100/60 flex items-center justify-center">
                <span className="text-8xl select-none">🐶</span>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl px-4 py-2 text-xs font-semibold text-emerald-600 whitespace-nowrap shadow-sm">🚚 Free Delivery</div>
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-white border border-gray-200 rounded-2xl px-4 py-2 text-xs font-semibold text-amber-600 whitespace-nowrap shadow-sm">🌟 4.9 Rating</div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl px-4 py-2 text-xs font-semibold text-violet-600 whitespace-nowrap shadow-sm">🏆 #1 Pet Store</div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories">
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase text-amber-500 font-semibold mb-2">Browse by pet</p>
            <h2 className="cg text-4xl font-bold text-gray-900">Shop by <span className="text-amber-500 italic">Category</span></h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map((cat,i) => (
              <button key={cat.name} onClick={() => { setActiveCategory(activeCategory===i?null:i); scrollTo("products"); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-colors ${activeCategory===i?"border-amber-400 bg-amber-50":"border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"}`}>
                <span className="text-3xl">{cat.name === "Dogs" ? "🐶" : cat.name === "Cats" ? "🐱" : cat.name === "Birds" ? "🐦" : cat.name === "Fish" ? "🐠" : cat.name === "Small Pets" ? "🐹" : "🐢"}</span>
                <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
                <span className="text-[10px] text-gray-400">{cat.count}</span>
              </button>
            ))}
          </div>
          {activeCategory !== null && (
            <div className="mt-3 text-center">
              <button onClick={() => setActiveCategory(null)} className="text-xs text-gray-400 hover:text-rose-500 transition-colors">✕ Clear filter</button>
            </div>
          )}
        </section>

        {/* PRODUCTS */}
        <section id="products">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-amber-500 font-semibold mb-2">Top picks</p>
              <h2 className="cg text-4xl font-bold text-gray-900">Featured <span className="text-amber-500 italic">Products</span></h2>
            </div>
            <button onClick={() => setActiveCategory(null)} className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-semibold">View all →</button>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {display.map(p => {
              const isAdded = !!(addedItems && addedItems[p.id]);
              return (
                <div key={p.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-44 bg-gray-50 flex items-center justify-center">
                    <span className="text-6xl select-none">
                      {p.id === 1 ? "🦴" : p.id === 2 ? "🐾" : p.id === 3 ? "😺" : p.id === 4 ? "🏡" : p.id === 5 ? "🛁" : "🐟"}
                    </span>
                    {p.tag && <span className={`absolute top-3 left-3 ${p.tagColor} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full`}>{p.tag}</span>}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-1">{p.brand}</p>
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2">{p.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Stars rating={p.rating}/><span className="text-[11px] text-gray-400">({p.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-amber-500">₹{p.price.toLocaleString()}</span>
                        {p.oldPrice && <span className="text-xs text-gray-400 line-through">₹{p.oldPrice.toLocaleString()}</span>}
                      </div>
                      <button 
                        onClick={() => {
                          if (onAdd) onAdd(p);
                          navigate('/Cart');
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold transition-all active:scale-95 shadow-sm ${isAdded ? "bg-emerald-500 text-white" : "bg-amber-500 hover:bg-amber-400 text-white"}`}
                      >
                        {isAdded ? "✓" : "+"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase text-amber-500 font-semibold mb-2">Happy customers</p>
            <h2 className="cg text-4xl font-bold text-gray-900">Pet Parent <span className="text-amber-500 italic">Stories</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="cg text-5xl text-amber-300 leading-none mb-1 select-none">"</div>
                <p className="text-sm text-gray-500 leading-relaxed italic -mt-3 mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${t.color} flex items-center justify-center text-xs font-bold text-white`}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700">{t.name}</div>
                    <div className="text-[11px] text-gray-400">{t.pet}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}