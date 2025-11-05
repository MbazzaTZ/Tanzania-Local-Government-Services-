import React from "react";

export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-700 font-semibold">{message}</p>
    </div>
  );
}

