import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./styles.css";

// Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout
import AppLayout from "./layouts/AppLayout";

// Pages
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Services from "./pages/Services";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminApplications from "./pages/admin/Applications";

// Super Admin
import UserManagement from "./pages/superadmin/UserManagement";

// Citizen / Staff
import MwananchiDashboard from "./pages/mwananchi/Dashboard";
import CitizenForms from "./pages/forms/CitizenForms";
import RegisterCaseForm from "./pages/forms/RegisterCaseForm";
import IdentityRequestForm from "./pages/forms/IdentityRequestForm";
import PermitRequestForm from "./pages/forms/PermitRequestForm";
import RegisterPaymentForm from "./pages/forms/RegisterPaymentForm";
import ReportingForm from "./pages/forms/ReportingForm";

export default function MainApp() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />

        <Routes>
          {/* ---------------- PUBLIC ---------------- */}
          <Route path="/" element={<Home />} />

          {/* ---------------- SUPER ADMIN ---------------- */}
          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/superadmin/users" element={<UserManagement />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Route>

          {/* ---------------- ADMIN ---------------- */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/applications" element={<AdminApplications />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Route>

          {/* ---------------- STAFF ---------------- */}
          <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/staff" element={<AdminApplications />} />
              <Route path="/forms" element={<CitizenForms />} />
              <Route path="/forms/register-case" element={<RegisterCaseForm />} />
              <Route path="/forms/identity-request" element={<IdentityRequestForm />} />
              <Route path="/forms/permit-request" element={<PermitRequestForm />} />
              <Route path="/forms/register-payment" element={<RegisterPaymentForm />} />
              <Route path="/forms/report-issue" element={<ReportingForm />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Route>

          {/* ---------------- CITIZEN ---------------- */}
          <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/mwananchi" element={<MwananchiDashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/forms" element={<CitizenForms />} />
              <Route path="/forms/register-case" element={<RegisterCaseForm />} />
              <Route path="/forms/identity-request" element={<IdentityRequestForm />} />
              <Route path="/forms/permit-request" element={<PermitRequestForm />} />
              <Route path="/forms/register-payment" element={<RegisterPaymentForm />} />
              <Route path="/forms/report-issue" element={<ReportingForm />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
