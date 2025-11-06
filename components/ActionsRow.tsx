// components/ActionsRow.tsx
"use client"; // This can be a client component if you add onClick handlers

import {
  ArrowDownToLine, // Deposit
  ArrowUpFromLine, // Withdraw
  Send, // Transfer
  Gem, // Level
} from "lucide-react";
import Link from "next/link";

// A re-usable button component for this row
function ActionButton({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer group">
      <div
        className={`p-4 bg-gray-800 rounded-2xl 
                       transition-all duration-200 group-hover:bg-gray-700 ${className}`}
      >
        {icon}
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}

// The main component that arranges the buttons
export function ActionsRow() {
  return (
    <div className="flex justify-around my-8">
      <Link href="/deposit">
        <ActionButton
          label="Deposit"
          className="text-green-400"
          icon={<ArrowDownToLine className="w-6 h-6" />}
        />
      </Link>
      <Link href="/withdraw">
        <ActionButton
          label="Withdraw"
          className="text-red-400"
          icon={<ArrowUpFromLine className="w-6 h-6" />}
        />
      </Link>
      <Link href="/transfer">
        <ActionButton
          label="Transfer"
          className="text-blue-400"
          icon={<Send className="w-6 h-6" />}
        />
      </Link>
      <ActionButton
        label="Level"
        className="text-purple-400"
        icon={<Gem className="w-6 h-6" />}
      />
    </div>
  );
}
