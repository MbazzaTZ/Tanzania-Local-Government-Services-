import React, { useState } from "react";
import { regions } from "../../data/locations";
import { supabase } from "../../supabase-config";

export default function ReportingForm() {
  const [formData, setFormData] = useState({
    reportType: "",
    description: "",
    district: "",
    ward: "",
    reporterName: "",
    reporterPhone: "",
  });
  const [message, setMessage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);

  const darDistricts =
    regions.find((r) => r.name === "Dar es Salaam")?.districts || [];
  const districts = darDistricts.map((d) => d.name);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData({ ...formData, district, ward: "" });

    const districtData = darDistricts.find((d) => d.name === district);
    setWards(districtData ? districtData.wards : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("citizen_reports").insert([
      {
        report_type: formData.reportType,
        description: formData.description,
        district: formData.district,
        ward: formData.ward,
        reporter_name: formData.reporterName,
        reporter_phone: formData.reporterPhone,
        timestamp: new Date(),
      },
    ]);

    if (error) {
      console.error("❌ Error submitting report:", error);
      setMessage(
        "Kuna tatizo wakati wa kutuma taarifa. Tafadhali jaribu tena."
      );
    } else {
      setMessage("✅ Taarifa imewasilishwa kwa mafanikio!");
      setFormData({
        reportType: "",
        description: "",
        district: "",
        ward: "",
        reporterName: "",
        reporterPhone: "",
      });
      setSelectedDistrict("");
      setWards([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Fomu ya Kuripoti Tukio
        </h2>
        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-center ${
              message.includes("mafanikio")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aina ya Taarifa */}
          <section className="border-b pb-6 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Aina ya Taarifa
            </h3>
            <select
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Chagua aina ya tukio --</option>
              <option value="Ufisadi">Ufisadi</option>
              <option value="Uharibifu wa Mazingira">Uharibifu wa Mazingira</option>
              <option value="Matumizi Mabaya ya Fedha">
                Matumizi Mabaya ya Fedha
              </option>
              <option value="Migogoro ya Ardhi">Migogoro ya Ardhi</option>
              <option value="Ukosefu wa Huduma">Ukosefu wa Huduma</option>
              <option value="Taarifa Nyingine">Taarifa Nyingine</option>
            </select>
          </section>

          {/* Maelezo ya Tukio */}
          <section className="border-b pb-6 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Maelezo ya Tukio
            </h3>
            <textarea
              id="description"
              name="description"
              placeholder="Eleza kwa ufupi tukio lililotokea..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </section>

          {/* Eneo la Tukio */}
          <section className="border-b pb-6 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Eneo la Tukio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                id="district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- Chagua Wilaya --</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <select
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                required
                disabled={!selectedDistrict}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option value="">-- Chagua Kata --</option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Taarifa za Mtoa Ripoti */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Taarifa za Mtoa Ripoti
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                id="reporterName"
                name="reporterName"
                placeholder="Jina Kamili (hiari)"
                value={formData.reporterName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="tel"
                id="reporterPhone"
                name="reporterPhone"
                placeholder="Namba ya Simu (hiari)"
                value={formData.reporterPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  reportType: "",
                  description: "",
                  district: "",
                  ward: "",
                  reporterName: "",
                  reporterPhone: "",
                });
                setSelectedDistrict("");
                setWards([]);
                setMessage("");
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Futa (Clear)
            </button>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Tuma Ripoti (Submit Report)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
