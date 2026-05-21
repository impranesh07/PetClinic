import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Global configurations specific to checkout step calculations
const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", desc: "Delivered in 2-3 days", price: 0, badge: "Free" },
  { id: "express", label: "Express Delivery", desc: "Same-day delivery in Siliguri", price: 150 }
];

// ─── INTERNAL SUB-COMPONENTS ───────────────────────────────────────────────────

function StepBar({ step }) {
  const steps = ["Cart", "Shipping", "Payment", "Confirm"];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${i < step ? "text-emerald-600" : i === step ? "bg-amber-500 text-white" : "text-gray-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${i < step ? "bg-emerald-500 border-emerald-500 text-white" : i === step ? "bg-white border-white text-amber-500" : "border-gray-300 text-gray-400"}`}>
              {i < step ? "✓" : i + 1}
            </span>
            {s}
          </div>
          {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ cart = [], shipping }) {
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipCost   = SHIPPING_OPTIONS.find(o => o.id === shipping)?.price ?? 0;
  const total      = subtotal + shipCost;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-20">
      <h3 className="font-bold text-gray-800 text-sm mb-5 pb-3 border-b border-gray-100">Order Summary</h3>
      <div className="space-y-3 mb-5">
        {cart.map(item => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
              <p className="text-[10px] text-gray-400">{item.brand} · Qty {item.qty}</p>
            </div>
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">₹{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
        <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-gray-500"><span>Shipping</span><span>{shipCost === 0 ? <span className="text-emerald-600 font-semibold">Free</span> : `₹${shipCost}`}</span></div>
        <div className="flex justify-between text-gray-900 font-bold text-sm pt-2 border-t border-gray-100">
          <span>Total</span><span>₹{total.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[11px] text-amber-700 font-medium">
        🐾 You're saving ₹{cart.reduce((s, i) => s + ((i.oldPrice || i.price) - i.price) * i.qty, 0).toLocaleString()} on this order!
      </div>
    </div>
  );
}

function CartStep({ cart = [], setCart, onNext, onBack }) {
  const update = (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const remove = id  => setCart(p => p.filter(i => i.id !== id));
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
        Your Cart <span className="text-amber-500">({cart.length} items)</span>
      </h2>
      {cart.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-400 text-sm mb-4">Your cart is empty.</p>
          <button onClick={onBack} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">← Back to Store</button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{item.brand}</p>
                <p className="text-sm font-bold text-gray-800">{item.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-bold text-amber-500">₹{item.price.toLocaleString()}</span>
                  {item.oldPrice && <span className="text-xs text-gray-400 line-through">₹{item.oldPrice.toLocaleString()}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-rose-400 text-xs transition-colors">✕ Remove</button>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-1 py-1">
                  <button onClick={() => update(item.id, -1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 font-bold text-sm transition-colors flex items-center justify-center">−</button>
                  <span className="w-6 text-center text-sm font-bold text-gray-700">{item.qty}</span>
                  <button onClick={() => update(item.id, +1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 font-bold text-sm transition-colors flex items-center justify-center">+</button>
                </div>
                <span className="text-xs font-bold text-gray-600">₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <button onClick={onBack} className="border border-gray-200 text-gray-500 hover:border-gray-400 font-medium px-6 py-3 rounded-xl text-sm transition-colors">← Back to Store</button>
            <button onClick={onNext} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 py-3 rounded-xl text-sm transition-colors">Proceed to Shipping →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShippingStep({ shipping, setShipping, address, setAddress, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!address.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(address.phone.trim())) e.phone = "Valid 10-digit number";
    if (!address.line1.trim()) e.line1 = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!/^\d{6}$/.test(address.pincode.trim())) e.pincode = "Valid 6-digit pincode";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const F = ({ label, field, placeholder, type = "text" }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
      <input type={type} value={address[field]} placeholder={placeholder}
        onChange={e => { setAddress(a => ({ ...a, [field]: e.target.value })); setErrors(ev => ({ ...ev, [field]: "" })); }}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors placeholder-gray-300 ${errors[field] ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
      {errors[field] && <p className="text-[10px] text-rose-500 mt-1">{errors[field]}</p>}
    </div>
  );
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Delivery <span className="text-amber-500">Details</span></h2>
      <div className="space-y-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-xs font-bold text-gray-700">📍 Delivery Address</p>
          <div className="grid grid-cols-2 gap-4"><F label="Full Name *" field="name" placeholder="Rahul Sharma" /><F label="Phone *" field="phone" placeholder="9876543210" type="tel" /></div>
          <F label="Address Line 1 *" field="line1" placeholder="House No., Street Name" />
          <F label="Address Line 2" field="line2" placeholder="Landmark, Area (optional)" />
          <div className="grid grid-cols-3 gap-4"><F label="City *" field="city" placeholder="Siliguri" /><F label="State" field="state" placeholder="West Bengal" /><F label="Pincode *" field="pincode" placeholder="734001" /></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-4">🚚 Shipping Method</p>
          <div className="space-y-3">
            {SHIPPING_OPTIONS.map(opt => (
              <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${shipping === opt.id ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-amber-200"}`}>
                <input type="radio" name="ship" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-amber-500" />
                <div className="flex-1"><p className="text-sm font-semibold text-gray-700">{opt.label}</p><p className="text-xs text-gray-400">{opt.desc}</p></div>
                <span className={`text-sm font-bold ${opt.price === 0 ? "text-emerald-600" : "text-gray-700"}`}>{opt.badge || `₹${opt.price}`}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onBack} className="border border-gray-200 text-gray-500 hover:border-gray-400 font-medium px-6 py-3 rounded-xl text-sm transition-colors">← Back</button>
          <button onClick={() => validate() && onNext()} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 py-3 rounded-xl text-sm transition-colors">Continue to Payment →</button>
        </div>
      </div>
    </div>
  );
}

function PaymentStep({ onNext, onBack, total }) {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const fmtCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
  const validate = () => {
    const e = {};
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length < 16) e.number = "Enter valid 16-digit number";
      if (!card.name.trim()) e.name = "Required";
      if (card.expiry.length < 5) e.expiry = "Enter valid MM/YY";
      if (card.cvv.length < 3) e.cvv = "Enter 3-digit CVV";
    }
    if (method === "upi" && !upi.includes("@")) e.upi = "Enter valid UPI ID";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const pay = () => { if (!validate()) return; setProcessing(true); setTimeout(() => { setProcessing(false); onNext(); }, 2000); };
  const methods = [{ id: "card", label: "Credit / Debit Card", icon: "💳" }, { id: "upi", label: "UPI", icon: "📱" }, { id: "cod", label: "Cash on Delivery", icon: "💵" }, { id: "netbanking", label: "Net Banking", icon: "🏦" }];
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Payment <span className="text-amber-500">Method</span></h2>
      <div className="space-y-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {methods.map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${method === m.id ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-amber-200"}`}>
                <span className="text-2xl">{m.icon}</span><span className="text-sm font-semibold text-gray-700">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
        {method === "card" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl px-6 flex flex-col justify-center">
              <p className="text-white/70 text-[10px] tracking-widest uppercase mb-1">Card Number</p>
              <p className="text-white font-mono text-base tracking-widest">{card.number || "•••• •••• •••• ••••"}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Card Number *</label>
              <input value={card.number} onChange={e => { setCard(c => ({ ...c, number: fmtCard(e.target.value) })); setErrors(ev => ({ ...ev, number: "" })); }} placeholder="1234 5678 9012 3456" maxLength={19}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono outline-none transition-colors ${errors.number ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
              {errors.number && <p className="text-[10px] text-rose-500 mt-1">{errors.number}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Cardholder Name *</label>
              <input value={card.name} onChange={e => { setCard(c => ({ ...c, name: e.target.value })); setErrors(ev => ({ ...ev, name: "" })); }} placeholder="Rahul Sharma"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.name ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
              {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Expiry *</label>
                <input value={card.expiry} onChange={e => { setCard(c => ({ ...c, expiry: fmtExp(e.target.value) })); setErrors(ev => ({ ...ev, expiry: "" })); }} placeholder="MM/YY" maxLength={5}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.expiry ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
                {errors.expiry && <p className="text-[10px] text-rose-500 mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">CVV *</label>
                <input value={card.cvv} onChange={e => { setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })); setErrors(ev => ({ ...ev, cvv: "" })); }} placeholder="•••" maxLength={3} type="password"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.cvv ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
                {errors.cvv && <p className="text-[10px] text-rose-500 mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <p className="text-[10px] text-gray-400">🔒 Your card details are encrypted and secure</p>
          </div>
        )}
        {method === "upi" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <label className="text-xs font-semibold text-gray-500 mb-2 block">UPI ID *</label>
            <input value={upi} onChange={e => { setUpi(e.target.value); setErrors({}); }} placeholder="yourname@upi"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.upi ? "border-rose-400 bg-rose-50" : "border-gray-200 focus:border-amber-400"}`} />
            {errors.upi && <p className="text-[10px] text-rose-500 mt-1">{errors.upi}</p>}
            <p className="text-[10px] text-gray-400 mt-2">Supported: GPay, PhonePe, Paytm, BHIM</p>
          </div>
        )}
        {method === "cod" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm font-semibold text-amber-700">💵 Pay when your order arrives</p>
            <p className="text-xs text-amber-600 mt-1">Available for orders up to ₹5,000 in Siliguri.</p>
          </div>
        )}
        {method === "netbanking" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-3">Select Your Bank</p>
            <div className="grid grid-cols-3 gap-3">
              {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Other"].map(b => (
                <button key={b} className="border border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-xl py-2.5 text-xs font-semibold text-gray-600 transition-colors">{b}</button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <button onClick={onBack} className="border border-gray-200 text-gray-500 hover:border-gray-400 font-medium px-6 py-3 rounded-xl text-sm transition-colors">← Back</button>
          <button onClick={pay} disabled={processing} className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm transition-colors flex items-center gap-2 min-w-48 justify-center">
            {processing ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> Processing...</> : <>🔒 Pay ₹{total.toLocaleString()}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmStep({ cart = [], address, shipping, onBackToStore }) {
  const orderId = `PH${Date.now().toString().slice(-8)}`;
  const opt = SHIPPING_OPTIONS.find(o => o.id === shipping);
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">✅</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Order Placed!</h2>
      <p className="text-gray-500 text-sm mb-1">Thank you for shopping with us 🐾</p>
      <p className="text-xs text-gray-400 mb-8">Order ID: <span className="font-mono font-bold text-gray-600">#{orderId}</span></p>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left mb-5 max-w-md mx-auto">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Delivery Details</p>
        <p className="text-sm font-semibold text-gray-800">{address.name || "—"}</p>
        <p className="text-xs text-gray-500">{address.line1}{address.line2 ? ", " + address.line2 : ""}</p>
        <p className="text-xs text-gray-500">{address.city}, {address.state} — {address.pincode}</p>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
          <span>🚚</span><span>{opt?.label} · {opt?.desc}</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left mb-8 max-w-md mx-auto">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Items Ordered</p>
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1"><p className="text-xs font-semibold text-gray-700">{item.name}</p><p className="text-[10px] text-gray-400">Qty {item.qty}</p></div>
              <span className="text-xs font-bold text-gray-700">₹{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={onBackToStore} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors">Continue Shopping 🐾</button>
        <button className="border border-gray-200 text-gray-500 hover:border-gray-400 font-medium px-8 py-3 rounded-xl text-sm transition-colors">Track Order →</button>
      </div>
    </div>
  );
}

// ─── MAIN EXPORTED CART PAGE ──────────────────────────────────────────────────

export default function CartPage({ cart = [], setCart, onBackToStore, Navbar }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState("standard");
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", line2: "", city: "Siliguri", state: "West Bengal", pincode: "" });

  const cartCount = (cart || []).reduce((s, i) => s + i.qty, 0);
  const subtotal  = (cart || []).reduce((s, i) => s + i.price * i.qty, 0);
  const shipCost  = SHIPPING_OPTIONS.find(o => o.id === shipping)?.price ?? 0;
  const total     = subtotal + shipCost;

  const handleBackNavigation = () => {
    if (onBackToStore) {
      onBackToStore();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Nunito',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;500;600;700;800&display=swap');`}</style>
      
      {Navbar ? (
        <Navbar cartCount={cartCount} onCartClick={() => { }} onLogoClick={handleBackNavigation} />
      ) : (
        <nav className="p-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center px-6 sticky top-0 z-50">
          <span onClick={handleBackNavigation} className="font-bold text-amber-500 cursor-pointer text-lg">Cart 🛒</span>
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Items: {cartCount}</span>
        </nav>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <StepBar step={step} />
        {step < 3 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 0 && <CartStep cart={cart} setCart={setCart} onNext={() => setStep(1)} onBack={handleBackNavigation} />}
              {step === 1 && <ShippingStep shipping={shipping} setShipping={setShipping} address={address} setAddress={setAddress} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
              {step === 2 && <PaymentStep onNext={() => setStep(3)} onBack={() => setStep(1)} total={total} />}
            </div>
            <div className="lg:col-span-1">
              <OrderSummary cart={cart} shipping={shipping} />
            </div> 
          </div>
        ) : (
          <ConfirmStep cart={cart} address={address} shipping={shipping} onBackToStore={() => { setCart([]); setStep(0); handleBackNavigation(); }} />
        )}
      </div>
    </div>
  );
}