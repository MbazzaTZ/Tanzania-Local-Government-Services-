// OfflinePage.jsx  Tanzania Local Government Portal 
// Shown when the user is offline or network is unavailable

import React from "react";
import offlineIcon from "/icons/icon-192x192.png";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-600 via-blue-700 to-yellow-500 text-white text-center p-6">
      <img
        src={offlineIcon}
        alt="Offline Icon"
        className="w-24 h-24 mb-6 animate-bounce"
      />
      <h1 className="text-3xl font-bold mb-2">Youre Offline</h1>
      <p className="max-w-md text-lg mb-6 opacity-90">
        It seems your internet connection is lost. Dont worry  you can still
        explore saved content. Once back online, all services will automatically
        resume.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition-all"
      >
         Try Again
      </button>
    </div>
  );
}
