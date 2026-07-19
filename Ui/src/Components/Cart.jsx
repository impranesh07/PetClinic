import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, CheckCircle, MapPin, Truck } from 'lucide-react';

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", desc: "Delivered in 2-3 days", price: 0, badge: "Free" },
  { id: "express", label: "Express Delivery", desc: "Same-day delivery in Siliguri", price: 150 }
];

const Cart = ({ cart = [], onUpdateQty, onRemoveItem, onBackToShop, setCart }) => {
  const [step, setStep] = useState(0); // 0: Cart Review, 1: Shipping, 2: Payment, 3: Confirmation
  const [shipping, setShipping] = useState("standard");
  
  // Form State Containers
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", line2: "", city: "Siliguri", state: "West Bengal", pincode: "" });
  const [addressErrors, setAddressErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [paymentErrors, setPaymentErrors] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Dynamic calculations based on cart parameters
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  const shippingThreshold = 500;
  
  // Calculate specific shipping costs depending on step context
  const baselineShippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 50;
  const deliveryTierCost = step >= 1 ? (SHIPPING_OPTIONS.find(o => o.id === shipping)?.price ?? 0) : baselineShippingCost;
  
  const grandTotal = subtotal + deliveryTierCost;
  const totalItemsCount = cart.reduce((s, i) => s + (i.qty || 1), 0);

  // Input Handlers and Formatters
  const handleCardNumberChange = (value) => {
    const cleanDigits = value.replace(/\D/g, "").slice(0, 16);
    setCard({ ...card, number: cleanDigits });
    if (paymentErrors.number) setPaymentErrors({ ...paymentErrors, number: "" });
  };

  const handleExpiryChange = (value) => {
    const cleanDigits = value.replace(/\D/g, "").slice(0, 4);
    if (cleanDigits.length >= 3) {
      setCard({ ...card, expiry: `${cleanDigits.slice(0, 2)}/${cleanDigits.slice(2, 4)}` });
    } else {
      setCard({ ...card, expiry: cleanDigits });
    }
    if (paymentErrors.expiry) setPaymentErrors({ ...paymentErrors, expiry: "" });
  };

  // Step Step Form Validations
  const validateAddress = () => {
    const errors = {};
    if (!address.name.trim()) errors.name = "Full name is required";
    if (!/^\d{10}$/.test(address.phone.trim())) errors.phone = "Enter a valid 10-digit number";
    if (!address.line1.trim()) errors.line1 = "Address field is required";
    if (!/^\d{6}$/.test(address.pincode.trim())) errors.pincode = "Enter a valid 6-digit pin";
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    if (paymentMethod === "card") {
      if (card.number.length < 16) errors.number = "Enter valid 16-digit card number";
      if (!card.name.trim()) errors.name = "Cardholder name required";
      if (card.expiry.length < 5) errors.expiry = "Use MM/YY format";
      if (card.cvv.replace(/\D/g, "").length < 3) errors.cvv = "Enter 3-digit CVV";
    }
    if (paymentMethod === "upi" && !upi.includes("@")) {
      errors.upi = "Enter a valid UPI handle (e.g. name@okhdfc)";
    }
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Safe progression flow handlers
  const handleProceedFromReview = () => {
    setStep(1);
  };

  const handleProceedFromShipping = () => {
    if (validateAddress()) {
      setStep(2);
    }
  };

  const executePaymentPipeline = () => {
    if (paymentMethod !== "cod" && !validatePayment()) return;
    
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation / Step Indicator Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-base-100 p-4 rounded-2xl shadow-sm border border-base-300 gap-4">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button 
              onClick={() => step === 0 ? onBackToShop() : setStep(prev => prev - 1)} 
              className="btn btn-sm btn-ghost gap-2 text-teal-600 hover:bg-teal-50 normal-case rounded-xl"
            >
              <ArrowLeft size={16} /> 
              <span>{step === 0 ? "Continue Shopping" : "Back"}</span>
            </button>
            <h1 className="text-md sm:text-lg font-bold text-base-content flex items-center gap-2">
              Shopping Cart 🛒
            </h1>
          </div>
          
          {/* Centralized Progress Stepper Tracker */}
          <div className="flex items-center gap-1.5 self-center overflow-x-auto max-w-full pb-1 md:pb-0">
            {["Review", "Shipping", "Payment", "Confirm"].map((label, idx) => (
              <div key={label} className="flex items-center text-xs font-bold shrink-0">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] mr-1.5 ${
                  idx < step ? "bg-emerald-500 border-emerald-500 text-white" : idx === step ? "bg-teal-600 border-teal-600 text-white" : "bg-base-200 text-gray-400 border-base-300"
                }`}>
                  {idx < step ? "✓" : idx + 1}
                </span>
                <span className={idx === step ? "text-teal-600 font-extrabold" : "text-gray-400"}>{label}</span>
                {idx < 3 && <div className={`w-6 h-px mx-1.5 ${idx < step ? "bg-emerald-400" : "bg-base-300"}`} />}
              </div>
            ))}
          </div>
        </div>

        {totalItemsCount === 0 && step < 3 ? (
          /* Empty Basket Slate View */
          <div className="bg-base-100 rounded-2xl p-16 text-center border border-base-300 shadow-sm">
            <span className="text-5xl">🛍️</span>
            <h3 className="font-bold text-lg mt-4 text-base-content">Your cart is completely empty</h3>
            <p className="text-gray-400 mt-1 max-w-xs mx-auto text-sm">
              Looks like your pets are waiting for some premium items. Let's find some toys!
            </p>
            <button 
              onClick={onBackToShop} 
              className="btn btn-md bg-teal-600 hover:bg-teal-700 text-white border-none mt-6 rounded-xl px-8 shadow-sm normal-case"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT CONTAINER WIDGET */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* STEP 0: REVIEW SHOPPING ITEMS LIST */}
              {step === 0 && (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="card card-side bg-base-100 max-h-28 shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition duration-150"
                    >
                      <div className="w-24 sm:w-28 shrink-0 bg-base-200 border-r border-base-300 relative">
                        {item.image && item.image.trim() !== "" ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-base-200">
                            <span className="text-2xl">🧸</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="card-body p-3 justify-between flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase tracking-wider block w-fit">
                              {item.category}
                            </span>
                            <h2 className="text-xs sm:text-sm font-bold text-base-content truncate mt-1" title={item.name}>
                              {item.name}
                            </h2>
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-base-content shrink-0 ml-2">
                            ₹{(item.price * (item.qty || 1)).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-base-200 mt-1">
                          <div className="flex items-center gap-1 bg-base-200 border border-base-300 rounded-xl p-0.5">
                            <button 
                              onClick={() => onUpdateQty && onUpdateQty(item.id, (item.qty || 1) - 1)}
                              disabled={(item.qty || 1) <= 1}
                              className="btn btn-ghost btn-xs min-h-0 h-6 w-6 p-0 bg-base-100 border border-base-300 shadow-sm rounded-lg text-gray-600 disabled:bg-transparent disabled:border-none disabled:text-gray-300"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold px-2.5 text-base-content min-w-[20px] text-center">
                              {item.qty || 1}
                            </span>
                            <button 
                              onClick={() => onUpdateQty && onUpdateQty(item.id, (item.qty || 1) + 1)}
                              className="btn btn-ghost btn-xs min-h-0 h-6 w-6 p-0 bg-base-100 border border-base-300 shadow-sm rounded-lg text-gray-600"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button 
                            onClick={() => onRemoveItem && onRemoveItem(item.id)} 
                            className="btn btn-ghost btn-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1 min-h-0 h-7 rounded-lg gap-1 border border-transparent hover:border-rose-100 normal-case transition-colors"
                          >
                            <Trash2 size={13} />
                            <span className="hidden sm:inline text-[10px]">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <button onClick={handleProceedFromReview} className="btn bg-teal-600 hover:bg-teal-700 text-white border-none px-8 rounded-xl normal-case text-xs shadow-md">
                      Proceed to Shipping →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1: SHIPPING DETAILS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-base-content flex items-center gap-2">
                      <MapPin size={16} className="text-teal-600" /> Delivery Address Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Full Name *</label>
                        <input value={address.name} onChange={e => { setAddress({...address, name: e.target.value}); setAddressErrors({...addressErrors, name:""}); }} type="text" placeholder="Rahul Sharma" className={`input input-bordered input-sm w-full rounded-xl ${addressErrors.name ? "input-error bg-rose-50/50 text-rose-700" : ""}`} />
                        {addressErrors.name && <p className="text-[10px] text-rose-500 mt-1 pl-1">{addressErrors.name}</p>}
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Phone Number *</label>
                        <input value={address.phone} onChange={e => { setAddress({...address, phone: e.target.value}); setAddressErrors({...addressErrors, phone:""}); }} type="tel" placeholder="9876543210" className={`input input-bordered input-sm w-full rounded-xl ${addressErrors.phone ? "input-error bg-rose-50/50 text-rose-700" : ""}`} />
                        {addressErrors.phone && <p className="text-[10px] text-rose-500 mt-1 pl-1">{addressErrors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 mb-1 block">Street Address *</label>
                      <input value={address.line1} onChange={e => { setAddress({...address, line1: e.target.value}); setAddressErrors({...addressErrors, line1:""}); }} type="text" placeholder="House No, Apartment, Block/Street name" className={`input input-bordered input-sm w-full rounded-xl ${addressErrors.line1 ? "input-error bg-rose-50/50 text-rose-700" : ""}`} />
                      {addressErrors.line1 && <p className="text-[10px] text-rose-500 mt-1 pl-1">{addressErrors.line1}</p>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">City</label>
                        <input value={address.city} type="text" className="input input-bordered input-sm w-full rounded-xl bg-base-200 font-semibold" disabled />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">State</label>
                        <input value={address.state} type="text" className="input input-bordered input-sm w-full rounded-xl bg-base-200 font-semibold" disabled />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Pincode *</label>
                        <input value={address.pincode} onChange={e => { setAddress({...address, pincode: e.target.value.replace(/\D/g,"").slice(0,6)}); setAddressErrors({...addressErrors, pincode:""}); }} type="text" placeholder="734001" className={`input input-bordered input-sm w-full rounded-xl ${addressErrors.pincode ? "input-error bg-rose-50/50 text-rose-700" : ""}`} />
                        {addressErrors.pincode && <p className="text-[10px] text-rose-500 mt-1 pl-1">{addressErrors.pincode}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-base-content flex items-center gap-2">
                      <Truck size={16} className="text-teal-600" /> Choose Shipping Method
                    </h3>
                    {SHIPPING_OPTIONS.map(opt => (
                      <label key={opt.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${shipping === opt.id ? "border-teal-500 bg-teal-50/40 font-semibold" : "border-base-300 hover:border-base-400"}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="radio radio-xs radio-primary checked:bg-teal-600 accent-teal-600" />
                          <div>
                            <p className="text-xs text-base-content">{opt.label}</p>
                            <p className="text-[10px] text-gray-400 font-normal">{opt.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-teal-700">{opt.badge || `₹${opt.price}`}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button onClick={handleProceedFromShipping} className="btn bg-teal-600 hover:bg-teal-700 text-white border-none px-8 rounded-xl normal-case text-xs shadow-md">
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT SECTION */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 bg-base-100 p-2 border border-base-300 rounded-2xl shadow-sm">
                    {[
                      { id: "card", label: "Debit/Credit Card", icon: "💳" }, 
                      { id: "upi", label: "UPI Handle", icon: "📱" }, 
                      { id: "cod", label: "Cash On Delivery", icon: "💵" }
                    ].map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => setPaymentMethod(m.id)} 
                        className={`btn btn-sm py-2.5 h-auto flex flex-col items-center border rounded-xl normal-case transition-all ${
                          paymentMethod === m.id ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600 shadow-sm" : "btn-ghost border-transparent text-gray-500"
                        }`}
                      >
                        <span className="text-base mb-0.5">{m.icon}</span>
                        <span className="text-[9px] font-bold tracking-tight">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm space-y-3.5">
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Card Number *</label>
                        <input value={card.number} onChange={e => handleCardNumberChange(e.target.value)} type="text" placeholder="4321 5678 9876 5432" className={`input input-bordered input-sm w-full font-mono rounded-xl tracking-widest ${paymentErrors.number ? "input-error bg-rose-50" : ""}`} />
                        {paymentErrors.number && <p className="text-[10px] text-rose-500 mt-1 pl-1">{paymentErrors.number}</p>}
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Cardholder Name *</label>
                        <input value={card.name} onChange={e => { setCard({...card, name: e.target.value}); setPaymentErrors({...paymentErrors, name:""}); }} type="text" placeholder="Rahul Sharma" className="input input-bordered input-sm w-full rounded-xl" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-gray-500 mb-1 block">Expiry *</label>
                          <input value={card.expiry} onChange={e => handleExpiryChange(e.target.value)} type="text" placeholder="MM/YY" className={`input input-bordered input-sm w-full text-center rounded-xl ${paymentErrors.expiry ? "input-error bg-rose-50" : ""}`} />
                          {paymentErrors.expiry && <p className="text-[10px] text-rose-500 mt-1 pl-1">{paymentErrors.expiry}</p>}
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-500 mb-1 block">CVV Sec Code *</label>
                          <input type="password" value={card.cvv} onChange={e => { setCard({...card, cvv: e.target.value.replace(/\D/g,"").slice(0,3)}); setPaymentErrors({...paymentErrors, cvv:""}); }} placeholder="•••" className={`input input-bordered input-sm w-full text-center rounded-xl ${paymentErrors.cvv ? "input-error bg-rose-50" : ""}`} />
                          {paymentErrors.cvv && <p className="text-[10px] text-rose-500 mt-1 pl-1">{paymentErrors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 mb-1 block">UPI ID Handle Address *</label>
                      <input value={upi} onChange={e => { setUpi(e.target.value); setPaymentErrors({...paymentErrors, upi: ""}); }} placeholder="rahul@oksbi" className={`input input-bordered input-sm w-full rounded-xl ${paymentErrors.upi ? "input-error bg-rose-50" : ""}`} />
                      {paymentErrors.upi && <p className="text-[10px] text-rose-500 mt-1 pl-1">{paymentErrors.upi}</p>}
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl p-4 text-xs leading-relaxed shadow-sm">
                      💵 <strong>Pay on Delivery Enabled:</strong> Please arrange exactly <strong>₹{grandTotal.toLocaleString()}</strong> in cash or use a smartphone to scan the delivery partner's QR code upon drop-off.
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button 
                      onClick={executePaymentPipeline} 
                      disabled={isProcessingPayment} 
                      className="btn bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white border-none min-w-[180px] rounded-xl normal-case text-xs shadow-md"
                    >
                      {isProcessingPayment ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <span className="flex items-center gap-1.5"><CreditCard size={14} /> Pay Securely ₹{grandTotal.toLocaleString()}</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TRANSACTION SUCCESS BREAKDOWN */}
              {step === 3 && (
                <div className="bg-base-100 border border-base-300 rounded-2xl p-8 text-center shadow-sm space-y-4 max-w-md mx-auto lg:col-span-3">
                  <CheckCircle size={54} className="text-emerald-500 mx-auto drop-shadow-sm" />
                  <h2 className="text-xl font-extrabold text-base-content tracking-tight">Order Registered Successfully!</h2>
                  <p className="text-[11px] text-gray-400">Your custom toy packages are being arranged. Reference Token: <strong className="text-gray-700 font-mono">#PET-{(Math.floor(Math.random() * 90000) + 10000)}</strong></p>
                  
                  <div className="bg-base-200 p-4 rounded-xl text-left text-xs text-base-content space-y-1.5 border border-base-300">
                    <p className="font-bold border-b border-base-300 pb-1 mb-1 text-[9px] uppercase text-gray-400 tracking-wider font-sans">Destination Information</p>
                    <p className="font-bold text-gray-700">{address.name} <span className="text-[10px] text-gray-400 font-normal">({address.phone})</span></p>
                    <p className="text-gray-500 text-[11px] leading-tight">{address.line1}, {address.city} — {address.pincode}</p>
                    <p className="text-[10px] text-teal-700 font-bold mt-1 bg-teal-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">
                      🚚 {SHIPPING_OPTIONS.find(o => o.id === shipping)?.label} Included
                    </p>
                  </div>

                  <button 
                    onClick={() => { if(setCart) setCart([]); setStep(0); onBackToShop(); }} 
                    className="btn bg-teal-600 hover:bg-teal-700 text-white border-none w-full rounded-xl normal-case text-xs font-bold shadow-md"
                  >
                    Continue Shopping 🐾
                  </button>
                </div>
              )}

            </div>

            {/* RIGHT SUMMARY COLUMN */}
            {step < 3 && (
              <div className="card bg-base-100 p-4 border border-base-300 shadow-sm h-fit space-y-4 rounded-2xl sticky top-4">
                <h3 className="font-bold text-xs text-base-content border-b border-base-200 pb-2 uppercase tracking-wide">
                  Checkout Details
                </h3>
                
                <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1 border-b border-base-100 pb-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-2 text-xs">
                      <div className="w-8 h-8 rounded bg-base-200 overflow-hidden shrink-0 flex items-center justify-center border border-base-300">
                        {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <span className="text-sm">🧸</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-base-content text-[11px]">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty {item.qty || 1}</p>
                      </div>
                      <span className="font-bold shrink-0 text-gray-500 text-[11px]">₹{(item.price * (item.qty || 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 text-xs text-base-content">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{step >= 1 ? "Shipping (Method Selection)" : "Shipping Fees"}</span>
                    <span className={`font-bold ${deliveryTierCost === 0 ? "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]" : ""}`}>
                      {deliveryTierCost === 0 ? "FREE" : `₹${deliveryTierCost}`}
                    </span>
                  </div>

                  {step === 0 && baselineShippingCost > 0 && (
                    <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-xl p-2.5 text-[10px] leading-relaxed">
                      💡 Add <strong>₹{(shippingThreshold - subtotal).toLocaleString()}</strong> more to unlock absolute <strong>Free Delivery</strong>!
                    </div>
                  )}

                  <div className="flex justify-between border-t border-base-200 pt-3 text-sm font-extrabold mt-2">
                    <span>Grand Total</span>
                    <span className="text-teal-600 text-base">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Primary context action footer button connected to correct step handling routing */}
                {step === 0 && (
                  <button 
                    onClick={handleProceedFromReview}
                    className="btn btn-block bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl mt-3 flex items-center justify-center gap-2 text-xs font-bold shadow-md normal-case"
                  >
                    <CreditCard size={14} /> 
                    <span>Proceed to Checkout</span>
                  </button>
                )}
                
                {step === 1 && (
                  <button 
                    onClick={handleProceedFromShipping}
                    className="btn btn-block bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl mt-3 flex items-center justify-center gap-2 text-xs font-bold shadow-md normal-case"
                  >
                    <span>Continue to Payment →</span>
                  </button>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;