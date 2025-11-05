import React, { useEffect, useState } from "react";

// ConnectionStatus.jsx  Supabase connectivity watchdog

export default function ConnectionStatus() {
  const [status, setStatus] = useState("checking"); // checking | online | offline
  const [message, setMessage] = useState("Checking connection...");
  const [showToast, setShowToast] = useState(false);

  const checkSupabase = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/?select=*&limit=1`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (response.ok) {
        if (status !== "online") {
          console.log(" Supabase connection restored.");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
        setStatus("online");
        setMessage("Connected to LocalGovTZ Cloud");
      } else {
        console.warn(" Supabase health check returned non-OK:", response.status);
        setStatus("offline");
        setMessage("Connection Lost  Retrying...");
      }
    } catch (err) {
      console.error("Supabase connection issue:", err);
      setStatus("offline");
      setMessage("Supabase not reachable");
    }
  };

  useEffect(() => {
    checkSupabase(); // Initial check
    const interval = setInterval(checkSupabase, 10000); // Recheck every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Connection Banner */}
      <div
        className={`fixed top-0 left-0 w-full text-center text-white py-2 font-medium transition-all z-50 ${
          status === "offline"
            ? "bg-red-600 animate-pulse"
            : status === "checking"
            ? "bg-yellow-500"
            : "bg-green-600"
        }`}
      >
        {message}
      </div>

      {/* Reconnect Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce z-50">
           Reconnected Successfully
        </div>
      )}
    </>
  );
}
