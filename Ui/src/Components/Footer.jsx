import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-16 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-base">
        
        {/* Brand & Emergency Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐾</span>
            <h2 className="text-3xl font-extrabold text-white">Petify</h2>
          </div>
          <p className="text-lg opacity-80 leading-relaxed">
            Providing compassionate, full-service healthcare for your pets.
          </p>
          <div className="pt-2">
            <p className="text-xs font-bold text-error uppercase tracking-wider">24/7 Emergency Care</p>
            <p className="text-2xl font-bold text-white">+1 (800) 555-PETS</p>
          </div>
        </div>

        {/* Updated Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-bold text-primary mb-2">Our Services</h3>
          <a className="link link-hover text-lg opacity-80 hover:opacity-100">Care</a>
          <a className="link link-hover text-lg opacity-80 hover:opacity-100">Emergency</a>
          <a className="link link-hover text-lg opacity-80 hover:opacity-100">Vaccination</a>
          <a className="link link-hover text-lg opacity-80 hover:opacity-100 text-primary font-semibold">
            Book Appointment
          </a>
        </div>

        {/* Hours & Location */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary mb-2">Visit Us</h3>
          <p className="text-lg opacity-80">
            📍 123 Pet Care Lane, Suite 100
          </p>
          <p className="text-lg opacity-80">
            🕒 Mon - Sat: 8:00 AM - 7:00 PM
          </p>
          <p className="text-lg opacity-80">
            ❤️ Sunday: Emergency Only
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-focus flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4">
        <p>© {new Date().getFullYear()} Petify Clinic. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer