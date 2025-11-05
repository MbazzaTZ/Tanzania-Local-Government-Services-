import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabase-config";
import ConnectionStatus from "./components/ConnectionStatus";

// Layout Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

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

/*  Error Boundary Component */
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  return (
    <React.Suspense fallback={<Spinner message="Loading..." />}>
      {hasError ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 text-center p-6">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong </h2>
          <p>Please refresh the page or try again later.</p>
          <button
            className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reload App
          </button>
        </div>
      ) : (
        children
      )}
    </React.Suspense>
  );
}

/*  Protected Route */
function ProtectedRoute({ user, children, role }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.user_metadata?.role !== role) return <Navigate to="/" replace />;
  return children;
}

/*  Main Application */
export default function MainApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabaseStatus, setSupabaseStatus] = useState("checking"); // online | offline | checking

  /*  Supabase Connection Health Check */
  const checkSupabase = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/?select=*&limit=1`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (response.ok) {
        if (supabaseStatus !== "online") {
          console.log(" Supabase reconnected successfully!");
        }
        setSupabaseStatus("online");
      } else {
        console.warn(" Supabase returned non-OK:", response.status);
        setSupabaseStatus("offline");
      }
    } catch (err) {
      console.error("Supabase connection issue:", err);
      setSupabaseStatus("offline");
    }
  };

  /*  Check Supabase connection every 10 seconds */
  useEffect(() => {
    checkSupabase();
    const interval = setInterval(checkSupabase, 10000);
    return () => clearInterval(interval);
  }, []);

  /*  User Auth Session */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (err) {
        console.error(" Supabase Auth Error:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <Spinner message="Connecting to LocalGovTZ Cloud..." />;

  const isLoggedIn = !!user;
  const role = user?.user_metadata?.role || "guest";

  /*  If Supabase is offline, show retry card */
  if (supabaseStatus === "offline") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h2 className="text-xl font-semibold mb-2">Connection Lost</h2>
        <p className="mb-4 text-gray-600">Unable to connect to LocalGovTZ Cloud.</p>
        <button
          onClick={checkSupabase}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow animate-bounce hover:bg-blue-700"
        >
           Retry Connection
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          {/* Top Navigation */}
          {isLoggedIn ? <Header /> : <Navbar />}
          <ConnectionStatus />

          <div className="flex flex-1 pt-16">
            {/* Sidebar */}
            {isLoggedIn && role !== "citizen" && <Sidebar user={user} />}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Citizen Forms */}
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

                {/* Dashboards */}
                <Route
                  path="/citizen/dashboard"
                  element={
                    <ProtectedRoute user={user} role="citizen">
                      <MwananchiDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute user={user} role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
