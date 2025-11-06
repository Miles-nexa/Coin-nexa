import React from "react";

export function InformationSection() {
  const infoText =
    "If you have any questions, please use your secure email address to contact the adminsitrator's only contact email";

  return (
    <div className="mt-8 bg-slate-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-1 h-5 bg-orange-200 mr-2" />
        <h2 className="text-xl font-semibold text-white">Information</h2>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm text-gray-300">{infoText}</p>

        <p className="pt-2">Email: coinnexawalletservice@gmail.com</p>
      </div>
    </div>
  );
}
