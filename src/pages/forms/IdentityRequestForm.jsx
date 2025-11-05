import React, { useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";

export default function IdentityRequestForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    address: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("identity_requests").insert([
        {
          full_name: formData.fullName,
          national_id: formData.nationalId,
          address: formData.address,
          reason: formData.reason,
          status: "Pending",
          created_at: new Date(),
        },
      ]);
      if (error) throw error;

      toast.success(" Identity request submitted successfully!");
      setFormData({ fullName: "", nationalId: "", address: "", reason: "" });
    } catch (err) {
      console.error(err);
      toast.error(" Failed to submit request: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-6 border border-blue-100">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
        Request Identity Certificate
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">National ID (NIDA)</label>
          <input
            type="text"
            name="nationalId"
            required
            value={formData.nationalId}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Request</label>
          <textarea
            name="reason"
            required
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

