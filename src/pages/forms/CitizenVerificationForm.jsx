import React, { useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CitizenVerificationForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nida_number: "",
    full_name: "",
    dob: "",
    gender: "",
    phone: "",
    guardian_name: "",
    guardian_contact: "",
    region: "",
    district: "",
    ward: "",
    village: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("citizen_verifications").insert([
      {
        ...form,
        user_id: user?.id,
        verification_status: "pending_verification",
      },
    ]);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Your verification request has been submitted.");
      navigate("/mwananchi");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Citizen Verification Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "nida_number", label: "NIDA Number" },
          { name: "full_name", label: "Full Name" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "gender", label: "Gender" },
          { name: "phone", label: "Phone" },
          { name: "guardian_name", label: "Guardian Name" },
          { name: "guardian_contact", label: "Guardian Contact" },
          { name: "region", label: "Region" },
          { name: "district", label: "District" },
          { name: "ward", label: "Ward" },
          { name: "village", label: "Village" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold mb-1">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        ))}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            disabled={loading}
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            {loading ? "Submitting..." : "Submit Verification"}
          </button>
        </div>
      </form>
    </div>
  );
}

