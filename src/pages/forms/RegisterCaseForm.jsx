import React, { useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";

export default function RegisterCaseForm() {
  const [formData, setFormData] = useState({
    caseTitle: "",
    description: "",
    citizenName: "",
    region: "",
    district: "",
    ward: "",
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
      const { error } = await supabase.from("cases").insert([
        {
          case_title: formData.caseTitle,
          description: formData.description,
          citizen_name: formData.citizenName,
          region: formData.region,
          district: formData.district,
          ward: formData.ward,
          status: "Pending",
          created_at: new Date(),
        },
      ]);
      if (error) throw error;

      toast.success(" Case registered successfully!");
      setFormData({
        caseTitle: "",
        description: "",
        citizenName: "",
        region: "",
        district: "",
        ward: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(" Failed to register case: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto mt-6 border border-blue-100">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
        Register New Case
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Title</label>
          <input
            type="text"
            name="caseTitle"
            required
            value={formData.caseTitle}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="3"
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ward</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Citizen Name</label>
          <input
            type="text"
            name="citizenName"
            required
            value={formData.citizenName}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
        >
          {loading ? "Submitting..." : "Register Case"}
        </button>
      </form>
    </div>
  );
}

