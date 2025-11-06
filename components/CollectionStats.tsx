// components/CollectionStats.tsx
import React from "react";

// Helper to format the large numbers
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// --- We define this re-usable component OUTSIDE the main function ---
// This is the template for one of the dark cards.
interface StatCardProps {
  title: string;
  amount: number;
}

const StatCard = ({ title, amount }: StatCardProps) => (
  // This is the card itself: dark background, rounded, with padding
  <div className="bg-slate-800 rounded-xl p-4 shadow-lg">
    <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
    <p className="text-2xl font-semibold text-white tracking-tight">
      {formatCurrency(amount)}
    </p>
  </div>
);

export function CollectionStats() {
  const monthlyAmount = 100000000.0;
  const dailyAmount = 10000000.0;

  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <StatCard
        title="Monthly Remaining Collection Amount"
        amount={monthlyAmount}
      />
      <StatCard
        title="Daily Remaining Collection Amount"
        amount={dailyAmount}
      />
    </div>
  );
}
