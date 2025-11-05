import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase-config";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", role: "staff", region: "" });

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*");
    if (error) toast.error(error.message);
    setUsers(data || []);
    setLoading(false);
  }

  async function createStaff(e) {
    e.preventDefault();
    const { email, password, role, region } = form;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, region } },
    });
    if (error) toast.error(error.message);
    else toast.success(`New ${role} for ${region} created`);
    setForm({ email: "", password: "", role: "staff", region: "" });
    loadUsers();
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Super Admin — User Management</h2>

      <form onSubmit={createStaff} className="bg-white shadow p-4 rounded-md space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">District Admin</option>
          <option value="staff">Ward Staff</option>
        </select>
        <input
          type="text"
          placeholder="Region / District"
          className="border p-2 w-full rounded"
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>

      <h3 className="font-semibold text-lg">All Users</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">{u.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
