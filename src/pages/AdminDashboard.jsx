import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    citizens: 0,
    permits: 0,
    payments: 0,
    reports: 0,
  });

  // Example mock fetch - in production connect Supabase tables
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate async fetch
        setTimeout(() => {
          setStats({
            citizens: 1234,
            permits: 248,
            payments: 1093,
            reports: 42,
          });
        }, 500);
      } catch (error) {
        toast.error("Failed to load statistics.");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
          <div className="text-gray-600 text-sm">
            Logged in as: <span className="font-semibold">{user?.email}</span>
          </div>
        </header>

        {/* STAT CARDS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-5 border-t-4 border-blue-600">
            <h2 className="text-gray-600 font-medium">Registered Citizens</h2>
            <p className="text-3xl font-bold text-blue-800 mt-2">{stats.citizens}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-5 border-t-4 border-green-500">
            <h2 className="text-gray-600 font-medium">Permit Requests</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">{stats.permits}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-5 border-t-4 border-yellow-500">
            <h2 className="text-gray-600 font-medium">Payments Processed</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.payments}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-5 border-t-4 border-red-500">
            <h2 className="text-gray-600 font-medium">Reports & Alerts</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.reports}</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            to="/admin/verification-queue"
            className="bg-white hover:bg-blue-50 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">Citizen Verification</h3>
            <p className="text-gray-600 text-sm mt-2">Approve or review new citizen registrations.</p>
          </Link>

          <Link
            to="/admin/case-management"
            className="bg-white hover:bg-green-50 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-green-700">Case & Permit Management</h3>
            <p className="text-gray-600 text-sm mt-2">Manage citizen cases and local permits.</p>
          </Link>

          <Link
            to="/admin/payment-approvals"
            className="bg-white hover:bg-yellow-50 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-yellow-700">Payment Approvals</h3>
            <p className="text-gray-600 text-sm mt-2">View, verify, and approve citizen payments.</p>
          </Link>

          <Link
            to="/admin/notifications"
            className="bg-white hover:bg-purple-50 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-purple-700">Notifications Center</h3>
            <p className="text-gray-600 text-sm mt-2">Send or monitor citizen notifications.</p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white hover:bg-gray-100 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-gray-700">Manage Users</h3>
            <p className="text-gray-600 text-sm mt-2">Create or update government staff accounts.</p>
          </Link>

          <Link
            to="/admin/reports"
            className="bg-white hover:bg-red-50 shadow border rounded-xl p-6 text-center transition"
          >
            <h3 className="text-lg font-semibold text-red-700">Reports & Analytics</h3>
            <p className="text-gray-600 text-sm mt-2">Analyze service performance data.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

