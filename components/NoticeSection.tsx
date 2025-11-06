import React from "react";

export function NoticeSection() {
  // Mock text for the information box
  const infoText =
    "This wallet is subject to an active legal freeze and has been placed under custody pending resolution of the referenced court order. All withdrawals, transfers, and trades are currently prohibited. Unauthorized access or interference may constitute contempt of court or criminal liability.";

  return (
    <div className="mt-8 bg-slate-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header for the Information section */}
      <div className="flex items-center p-4">
        <div className="w-1 h-5 bg-red-800 mr-2" />
        <h2 className="text-xl font-semibold text-white">Notice</h2>
      </div>

      {/* A small divider */}
      <hr className="border-gray-700" />

      {/* Content of the information box */}
      <div className="p-4">
        <p className="text-sm text-gray-300">{infoText}</p>
      </div>
    </div>
  );
}
