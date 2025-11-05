// Tanzania Local Government Portal 🇹🇿
// Unified App Router — React + Supabase + PWA Ready + Offline Detection

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabase-config";

// Layout Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import A2HS from "./components/A2HS"; // ✅ Add to Home Screen popup

// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import MwananchiDashboard from "./pages/MwananchiDashboard";

// Citizen Forms
import CitizenForms from "./pages/forms/CitizenForms";
import PermitRequestForm from "./pages/forms/PermitRequestForm";
import IdentityRequestForm from "./pages/forms/IdentityRequestForm";
import RegisterCaseForm from "./pages/forms/RegisterCaseForm";
import ReportingForm from "./pages/forms/ReportingForm";
import RegisterPaymentForm from "./pages/forms/RegisterPaymentForm";

// ✅ Protected Route Wrapper
function ProtectedRoute({ user, children, role }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.user_metadata?.role !== role) return <Navigate to="/" replace />;
  return children;
}

// ✅ Offline Notification Banner
function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black font-medium text-center py-3 shadow-lg z-50 animate-fade-in">
      ⚠️ You are currently offline — some features may be unavailable.
    </div>
  );
}

export default function MainApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Authentication and Session Management
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <Spinner message="Loading your session..." />;

  const isLoggedIn = !!user;
  const role = user?.user_metadata?.role || "guest";

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 animate-fade-in">
        {/* Top Navigation */}
        {isLoggedIn ? <Header /> : <Navbar />}

        <div className="flex flex-1 pt-16">
          {/* Sidebar — Only for Logged-In Admin/Staff */}
          {isLoggedIn && role !== "citizen" && <Sidebar user={user} />}

          {/* Main Page Content */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Routes>
              {/* 🌍 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* 🧾 Citizen Forms */}
              <Route
                path="/citizen/forms"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <CitizenForms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/permit-request"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <PermitRequestForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/identity-request"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <IdentityRequestForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/register-case"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <RegisterCaseForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/reporting"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <ReportingForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/register-payment"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <RegisterPaymentForm />
                  </ProtectedRoute>
                }
              />

              {/* 👤 Citizen Dashboard */}
              <Route
                path="/citizen/dashboard"
                element={
                  <ProtectedRoute user={user} role="citizen">
                    <MwananchiDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 🛠️ Admin Dashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute user={user} role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Footer + A2HS + Offline Banner */}
        <Footer />
        <A2HS />
        <OfflineBanner />
      </div>
    </Router>
  );
}
