import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  ClipboardCheck,
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { signOut, userRole, userMeta } = useAuth();

  const isActive = (path) =>
    pathname === path
      ? "bg-green-600 text-white"
      : "text-white hover:bg-green-600";

  return (
    <aside className="w-64 bg-green-700 text-white flex flex-col">
      <div className="p-4 text-center text-xl font-bold border-b border-green-600">
        🇹🇿 LG Portal
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* ---------- SUPER ADMIN ---------- */}
        {userRole === "superadmin" && (
          <>
            <h4 className="uppercase text-sm font-semibold text-green-200 mb-2">
              Super Admin
            </h4>
            <Link
              to="/superadmin/users"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/superadmin/users"
              )}`}
            >
              <ShieldCheck size={18} /> Manage Users
            </Link>
            <Link
              to="/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/resources"
              )}`}
            >
              <Settings size={18} /> Resources
            </Link>
          </>
        )}

        {/* ---------- ADMIN ---------- */}
        {userRole === "admin" && (
          <>
            <h4 className="uppercase text-sm font-semibold text-green-200 mb-2">
              Admin Panel
            </h4>
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/admin"
              )}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/admin/applications"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/admin/applications"
              )}`}
            >
              <FileText size={18} /> Applications
            </Link>
            <Link
              to="/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/resources"
              )}`}
            >
              <Settings size={18} /> Resources
            </Link>
          </>
        )}

        {/* ---------- STAFF ---------- */}
        {userRole === "staff" && (
          <>
            <h4 className="uppercase text-sm font-semibold text-green-200 mb-2">
              Staff Panel
            </h4>
            <p className="text-xs italic text-green-100 mb-1">
              {userMeta?.region
                ? `${userMeta.region} / ${userMeta.district ?? ""} ${userMeta.ward ?? ""} ${userMeta.village ?? ""}`
                : "No region assigned"}
            </p>

            <Link
              to="/staff"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/staff"
              )}`}
            >
              <LayoutDashboard size={18} /> My Applications
            </Link>

            <Link
              to="/forms"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/forms"
              )}`}
            >
              <FileText size={18} /> Forms
            </Link>

            <Link
              to="/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/resources"
              )}`}
            >
              <Settings size={18} /> Resources
            </Link>
          </>
        )}

        {/* ---------- CITIZEN ---------- */}
        {userRole === "citizen" && (
          <>
            <h4 className="uppercase text-sm font-semibold text-green-200 mb-2">
              Mwananchi
            </h4>
            <Link
              to="/mwananchi"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/mwananchi"
              )}`}
            >
              <Home size={18} /> My Dashboard
            </Link>

            <Link
              to="/services"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/services"
              )}`}
            >
              <Users size={18} /> Services
            </Link>

            <Link
              to="/forms"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/forms"
              )}`}
            >
              <ClipboardCheck size={18} /> Forms
            </Link>

            <Link
              to="/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive(
                "/resources"
              )}`}
            >
              <Settings size={18} /> Resources
            </Link>
          </>
        )}
      </nav>

      <button
        onClick={signOut}
        className="m-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-md font-semibold transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}

