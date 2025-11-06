import React from "react";
import { FaGreaterThan } from "react-icons/fa6";

import { SiTether } from "react-icons/si";

interface YieldCardProps {
  days: number;
  yieldRate: number;
  currency: string;
}

const YieldCard = ({ days, yieldRate, currency }: YieldCardProps) => (
  <div className="bg-gray-600 rounded-xl px-4 py-2 shadow-lg flex flex-col items-start space-y-2">
    <div className="flex items-center justify-between w-full">
      <div className="p-2 bg-teal-700 rounded-full">
        <SiTether className="w-6 h-6 text-white" />
      </div>

      <div>
        <span className="text-white font-medium">{currency}</span>
        <p className="text-gray-400 text-sm">{days}days</p>
      </div>
    </div>
    <p className="text-xl font-semibold">
      {yieldRate.toFixed(2)}%{" "}
      <span className="text-gray-400 text-sm">yield</span>
    </p>
  </div>
);

export function FinancingSection() {
  const financingOptions = [
    { days: 60, yieldRate: 400.0, currency: "USDT" },
    { days: 30, yieldRate: 100.0, currency: "USDT" },
  ];

  return (
    <div className="mt-8 bg-slate-700/50 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-1 h-5 bg-orange-200 mr-2" />
          <h2 className="text-xl font-medium text-white">Financing</h2>
        </div>
        <span className="flex items-center gap-1.5 cursor-pointer">
          More <FaGreaterThan />
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financingOptions.map((option, index) => (
          <YieldCard
            key={index}
            days={option.days}
            yieldRate={option.yieldRate}
            currency={option.currency}
          />
        ))}
      </div>
    </div>
  );
}
