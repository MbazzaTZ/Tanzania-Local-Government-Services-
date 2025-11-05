import React, { useState } from "react";
import { supabase } from "../supabase-config";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password-confirm`,
      });

      if (error) {
        setMessage(" " + error.message);
      } else {
        setMessage(" Password reset link sent! Check your email inbox.");
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
          Reset Your Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 px-3 py-2"
              placeholder="Enter your registered email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium">
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-blue-700 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

