import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Download, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default function MwananchiDashboard({ user }) {
  const [status, setStatus] = useState("pending");
  const [controlNumber, setControlNumber] = useState(null);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading from Supabase
  useEffect(() => {
    const fetchCitizenData = async () => {
      try {
        // Example simulated data fetch
        setTimeout(() => {
          setStatus("verified");
          setControlNumber("CN-48291-TZ");
          setCertificateUrl("https://your-supabase-storage-link/citizen_certificate_48291.pdf");
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load your account details.");
        setLoading(false);
      }
    };

    fetchCitizenData();
  }, []);

  const handleDownloadCertificate = () => {
    if (!certificateUrl) {
      toast.error("No certificate available yet.");
      return;
    }
    window.open(certificateUrl, "_blank");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Citizen Dashboard</h1>
          <span className="text-gray-600 text-sm">
            Logged in as: <strong>{user?.email}</strong>
          </span>
        </header>

        {loading ? (
          <div className="text-center text-gray-600 mt-10">Loading your data...</div>
        ) : (
          <>
            {/* STATUS CARD */}
            <div className="bg-white shadow rounded-xl p-6 mb-6 border-t-4 
              ">
              <div className="flex items-center gap-3">
                {status === "verified" ? (
                  <CheckCircle className="text-green-600 w-6 h-6" />
                ) : status === "pending" ? (
                  <Clock className="text-yellow-600 w-6 h-6" />
                ) : (
                  <AlertTriangle className="text-red-600 w-6 h-6" />
                )}
                <h2 className="text-lg font-semibold text-gray-800">Verification Status</h2>
              </div>
              <p className="mt-2 text-gray-700">
                {status === "verified" && "You are a verified resident. You can now access all citizen services."}
                {status === "pending" && "Your verification is under review by local staff."}
                {status === "declined" && "Your application was declined. Please contact your local office."}
              </p>
            </div>

            {/* CONTROL NUMBER */}
            <div className="bg-white shadow rounded-xl p-6 mb-6 border-t-4 border-blue-500">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Control Number</h2>
              {controlNumber ? (
                <div className="text-2xl font-bold text-blue-800">{controlNumber}</div>
              ) : (
                <p className="text-gray-600">No control number assigned yet.</p>
              )}
            </div>

            {/* CERTIFICATE SECTION */}
            <div className="bg-white shadow rounded-xl p-6 border-t-4 border-green-500">
              <h2 className="text-lg font-semibold text-green-700 mb-2">Resident Certificate</h2>
              {status === "verified" && certificateUrl ? (
                <button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>
              ) : (
                <p className="text-gray-600">
                  Your certificate will be available once verification is complete.
                </p>
              )}
            </div>

            {/* QUICK LINKS */}
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Link
                to="/citizen/forms"
                className="bg-white shadow border rounded-xl p-6 text-center hover:bg-blue-50 transition"
              >
                <h3 className="text-blue-700 font-semibold text-lg">Access Forms</h3>
                <p className="text-gray-600 text-sm mt-2">Submit identity, permit or payment forms.</p>
              </Link>

              <Link
                to="/resources"
                className="bg-white shadow border rounded-xl p-6 text-center hover:bg-green-50 transition"
              >
                <h3 className="text-green-700 font-semibold text-lg">Resources</h3>
                <p className="text-gray-600 text-sm mt-2">Learn about local policies and services.</p>
              </Link>

              <Link
                to="/citizen/support"
                className="bg-white shadow border rounded-xl p-6 text-center hover:bg-yellow-50 transition"
              >
                <h3 className="text-yellow-700 font-semibold text-lg">Support</h3>
                <p className="text-gray-600 text-sm mt-2">Contact your local government for help.</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

