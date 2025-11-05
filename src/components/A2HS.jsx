// A2HS.jsx  Add to Home Screen Popup Component
// Tanzania Local Government Portal 

import React, { useEffect, useState } from "react";
import appIcon from "/icons/icon-192x192.png";

export default function A2HS() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the A2HS prompt`);
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleClose = () => setShowPrompt(false);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 via-blue-700 to-yellow-500 text-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4 animate-fade-in z-50 w-[90%] md:w-[400px] border-2 border-black">
      <img src={appIcon} alt="LocalGovTZ Icon" className="w-12 h-12 rounded-xl border border-white shadow-md" />
      <div className="flex-1">
        <h3 className="font-bold text-lg">Install LocalGovTZ App</h3>
        <p className="text-sm opacity-90">Access local services anytime  fast, secure, and offline ready </p>
      </div>
      <button onClick={handleInstall} className="bg-white text-blue-700 font-semibold px-3 py-1.5 rounded-lg shadow hover:bg-yellow-300 transition-all">Install</button>
      <button onClick={handleClose} className="ml-2 text-white font-bold text-lg hover:text-yellow-200" title="Dismiss"></button>
    </div>
  );
}
