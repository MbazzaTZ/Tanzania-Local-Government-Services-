import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";

export default function CitizenVerificationQueue() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRecords() {
    setLoading(true);
    const { data, error } = await supabase.from("citizen_verifications").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRecords(data || []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("citizen_verifications")
      .update({ verification_status: status })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Status updated");
      loadRecords();
    }
  }

  useEffect(() => {
    loadRecords();
    const channel = supabase
      .channel("citizen_verifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "citizen_verifications" }, loadRecords)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Citizen Verification Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-2 text-left">Full Name</th>
              <th className="p-2 text-left">NIDA</th>
              <th className="p-2 text-left">Ward</th>
              <th className="p-2 text-left">Village</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.full_name}</td>
                <td className="p-2">{r.nida_number}</td>
                <td className="p-2">{r.ward}</td>
                <td className="p-2">{r.village}</td>
                <td className="p-2 capitalize">{r.verification_status}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => updateStatus(r.id, "approved")} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">Approve</button>
                  <button onClick={() => updateStatus(r.id, "declined")} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">Decline</button>
                  <button onClick={() => updateStatus(r.id, "escalated")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md">Escalate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
