import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-config";

export default function ResetPasswordConfirm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMessage(" " + error.message);
      } else {
        setMessage(" Password updated successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      setMessage(" Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          Set a New Password
        </h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 px-3 py-2"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 px-3 py-2"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <p
            className={\mt-4 text-center font-medium \\}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-700 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

