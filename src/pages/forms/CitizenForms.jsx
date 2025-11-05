import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ClipboardCheck, Wallet, IdCard, FileSignature } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function CitizenForms() {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  // Allow only Citizen or Staff to access
  if (userRole !== "citizen" && userRole !== "staff") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Access Denied</h2>
          <p className="text-gray-600">This page is restricted to Citizens and Staff only.</p>
        </div>
      </div>
    );
  }

  const forms = [
    {
      name: "Register Case",
      desc: "Record local disputes or case details for mediation and follow-up.",
      path: "/forms/register-case",
      icon: <FileSignature size={24} className="text-green-600" />,
    },
    {
      name: "Identity Request",
      desc: "Request official verification of your residence or identity.",
      path: "/forms/identity-request",
      icon: <IdCard size={24} className="text-green-600" />,
    },
    {
      name: "Permit Request",
      desc: "Apply for permits such as construction, event, or business permissions.",
      path: "/forms/permit-request",
      icon: <ClipboardCheck size={24} className="text-green-600" />,
    },
    {
      name: "Register Payment",
      desc: "Submit and record local government payments or contributions.",
      path: "/forms/register-payment",
      icon: <Wallet size={24} className="text-green-600" />,
    },
    {
      name: "Report Issue",
      desc: "Report community problems or provide feedback for improvement.",
      path: "/forms/report-issue",
      icon: <FileText size={24} className="text-green-600" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Citizen Forms Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Below are the available forms you can fill and submit digitally to your local government office.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div
            key={form.name}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-5 flex flex-col justify-between transition"
          >
            <div className="flex items-center gap-3 mb-3">
              {form.icon}
              <h2 className="font-semibold text-lg">{form.name}</h2>
            </div>
            <p className="text-sm text-gray-600 flex-1">{form.desc}</p>
            <button
              onClick={() => navigate(form.path)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 w-full transition"
            >
              Open Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
