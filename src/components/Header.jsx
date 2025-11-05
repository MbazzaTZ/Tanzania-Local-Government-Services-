import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase-config";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-blue-800 text-white shadow-md w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/favicon.ico"
            alt="Gov Portal"
            className="w-8 h-8 rounded-md border border-blue-600 bg-white"
          />
          <Link to="/" className="text-lg font-bold tracking-wide">
            Tanzania Local Government Portal
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/citizen/forms" className="hover:text-yellow-300 transition">Citizen Forms</Link>
          <Link to="/resources" className="hover:text-yellow-300 transition">Resources</Link>
          <Link to="/services" className="hover:text-yellow-300 transition">Services</Link>
        </nav>

        {/* Right: User Info */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="text-right">
                <p className="text-sm font-semibold">{user.email}</p>
                <p className="text-xs text-blue-200">
                  {user.user_metadata?.role || "Citizen"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md text-blue-900 font-semibold text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-blue-700 border-t border-blue-600 text-sm px-6 py-2 flex justify-around">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/citizen/forms" className="hover:text-yellow-300">Forms</Link>
        <Link to="/services" className="hover:text-yellow-300">Services</Link>
        <Link to="/resources" className="hover:text-yellow-300">Resources</Link>
      </div>
    </header>
  );
}

