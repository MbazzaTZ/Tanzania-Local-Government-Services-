import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Government Services</h1>
      <p className="text-gray-700 mb-6">
        Explore available public services offered under the Tanzania Local Government Portal.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/citizen/forms"
          className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-200 border border-gray-100"
        >
          <h2 className="font-semibold text-lg text-blue-700">Citizen Forms</h2>
          <p className="text-sm text-gray-600 mt-2">
            Access registration, permit, and reporting forms.
          </p>
        </Link>

        <Link
          to="/resources"
          className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-200 border border-gray-100"
        >
          <h2 className="font-semibold text-lg text-blue-700">Resources Center</h2>
          <p className="text-sm text-gray-600 mt-2">
            Read policies, guides, and documents for citizens and local officers.
          </p>
        </Link>

        <Link
          to="/login"
          className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-200 border border-gray-100"
        >
          <h2 className="font-semibold text-lg text-blue-700">Access Portal</h2>
          <p className="text-sm text-gray-600 mt-2">
            Sign in to manage or request government services.
          </p>
        </Link>
      </div>
    </div>
  );
}

