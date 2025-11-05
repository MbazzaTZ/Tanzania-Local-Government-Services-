import React, { useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";

export default function RegisterPaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    amount: "",
    controlNumber: "",
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
      // Insert into Supabase table `payments`
      const { data, error } = await supabase.from("payments").insert([
        {
          citizen_name: formData.name,
          service_type: formData.serviceType,
          amount: parseFloat(formData.amount),
          control_number: formData.controlNumber || generateControlNumber(),
          status: "Pending",
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      toast.success(" Payment registered successfully!");
      setFormData({ name: "", serviceType: "", amount: "", controlNumber: "" });
    } catch (err) {
      console.error(err);
      toast.error(" Failed to register payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateControlNumber = () => {
    return "CN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-6 border border-blue-100">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
        Register Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Type</label>
          <select
            name="serviceType"
            required
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Select Service</option>
            <option value="Permit">Permit</option>
            <option value="Identity">Identity Certificate</option>
            <option value="Case Registration">Case Registration</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (TZS)</label>
          <input
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
        >
          {loading ? "Submitting..." : "Register Payment"}
        </button>
      </form>
    </div>
  );
}

