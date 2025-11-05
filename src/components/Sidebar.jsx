import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Home,
  FolderOpen,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../supabase-config";

export default function Sidebar({ user }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const role = user?.user_metadata?.role || "citizen";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-700";

  const adminLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Applications", icon: FolderOpen, path: "/admin/applications" },
    { name: "Citizens", icon: Users, path: "/admin/citizens" },
    { name: "Approvals", icon: CheckCircle, path: "/admin/verifications" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const citizenLinks = [
    { name: "My Dashboard", icon: Home, path: "/citizen/dashboard" },
    { name: "My Forms", icon: FileText, path: "/citizen/forms" },
    { name: "My Payments", icon: FolderOpen, path: "/citizen/register-payment" },
  ];

  const menu = role === "admin" ? adminLinks : citizenLinks;

  return (
    <aside
      className={`bg-blue-800 text-white h-screen fixed top-0 left-0 z-40 flex flex-col transition-all ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-700">
        <h1 className="text-lg font-bold tracking-wide">
          {collapsed ? "TZ" : "Local Gov"}
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-200 hover:text-yellow-300"
          title={collapsed ? "Expand" : "Collapse"}
        >
          
        </button>
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto">
        {menu.map(({ name, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-4 py-2 mb-1 rounded-md transition ${isActive(
              path
            )}`}
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">{name}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t border-blue-700 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-600 transition text-sm w-full"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

