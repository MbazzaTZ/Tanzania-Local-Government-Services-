import React, { useState } from "react";
import { regions } from "../../data/locations";
import { supabase } from "../../supabase-config";

export default function PermitRequestForm() {
  const [formData, setFormData] = useState({
    permitType: "",
    fullName: "",
    phoneNumber: "",
    district: "",
    ward: "",
    street: "",
    detailedPermitType: "",
    fee: "",
  });
  const [message, setMessage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [permitSubTypes, setPermitSubTypes] = useState([]);

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

  const handlePermitTypeChange = (e) => {
    const type = e.target.value;
    setFormData({ ...formData, permitType: type, detailedPermitType: "" });
    switch (type) {
      case "Kibali cha Ujenzi":
        setPermitSubTypes([
          "Nyumba ya Makazi",
          "Fremu ya Biashara",
          "Uzio/Ukuta",
          "Ukarabati Mkubwa",
          "Nyingineyo",
        ]);
        break;
      case "Kibali cha Mazishi":
        setPermitSubTypes([
          "Ndani ya Wilaya",
          "Nje ya Wilaya",
          "Kutoka Nje ya Nchi",
        ]);
        break;
      case "Kibali cha Sherehe":
        setPermitSubTypes([
          "Harusi",
          "Sherehe ya Kuzaliwa",
          "Kumbukumbu",
          "Nyingineyo",
        ]);
        break;
      case "Kibali cha Mikutano":
        setPermitSubTypes([
          "Mkutano wa Kisiasa",
          "Mkutano wa Kidini",
          "Mkutano wa Kibiashara",
          "Nyingineyo",
        ]);
        break;
      default:
        setPermitSubTypes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("permitRequests").insert([
      {
        ...formData,
        timestamp: new Date(),
      },
    ]);

    if (error) {
      console.error("❌ Error submitting request:", error);
      setMessage(
        "Kuna tatizo wakati wa kuwasilisha ombi. Jaribu tena. (Error submitting request.)"
      );
    } else {
      setMessage("✅ Ombi la Kibali limewasilishwa kwa mafanikio!");
      setFormData({
        permitType: "",
        fullName: "",
        phoneNumber: "",
        district: "",
        ward: "",
        street: "",
        detailedPermitType: "",
        fee: "",
      });
      setSelectedDistrict("");
      setWards([]);
      setPermitSubTypes([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 p-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Ombi la Kibali
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
          <section className="border-b pb-6 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Chagua Aina ya Kibali
            </h3>
            <select
              id="permitType"
              name="permitType"
              value={formData.permitType}
              onChange={handlePermitTypeChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">-- Chagua aina ya kibali --</option>
              <option value="Kibali cha Ujenzi">Kibali cha Ujenzi</option>
              <option value="Kibali cha Mazishi">Kibali cha Mazishi</option>
              <option value="Kibali cha Sherehe">Kibali cha Sherehe</option>
              <option value="Kibali cha Mikutano">Kibali cha Mikutano</option>
            </select>
          </section>

          <section className="border-b pb-6 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Taarifa za Mwombaji
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Jina Kamili*"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Namba ya Simu*"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Anuani ya Mwombaji
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                id="district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
              >
                <option value="">-- Chagua Kata --</option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="street"
                name="street"
                placeholder="Mtaa*"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  permitType: "",
                  fullName: "",
                  phoneNumber: "",
                  district: "",
                  ward: "",
                  street: "",
                  detailedPermitType: "",
                  fee: "",
                });
                setSelectedDistrict("");
                setWards([]);
                setPermitSubTypes([]);
                setMessage("");
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Futa (Clear)
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Wasilisha Ombi (Submit Request)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
