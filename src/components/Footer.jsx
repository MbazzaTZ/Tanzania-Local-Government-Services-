import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white mt-10 border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {/* Left section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Tanzania Local Government Portal</h2>
          <p className="text-sm text-blue-100">
            Empowering transparency, service delivery, and digital governance across all local authorities in Tanzania.
          </p>
        </div>

        {/* Center section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/citizen/forms" className="hover:text-yellow-300 transition">Citizen Forms</Link>
          <Link to="/resources" className="hover:text-yellow-300 transition">Resources</Link>
          <Link to="/support" className="hover:text-yellow-300 transition">Support</Link>
        </div>

        {/* Right section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-md font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:support@localgov.tz" className="hover:text-yellow-300">support@localgov.tz</a></p>
          <p>Phone: +255 22 123 4567</p>
          <p>Office Hours: Mon–Fri, 8am–5pm</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-900 text-center py-4 border-t border-blue-700">
        <p className="text-sm text-blue-200">
          © {new Date().getFullYear()} Tanzania Local Government Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

