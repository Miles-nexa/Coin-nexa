// components/WithdrawList.tsx
"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Coin } from "@/lib/coinData";

// Define the type for the asset data we'll receive
// It's the static 'Coin' info + the dynamic 'balance' info
type UserAsset = Coin & {
  balance: number;
  usdValue: number;
};

// --- Re-usable Coin Item Component ---
// This can live inside the same file
const CoinItem = ({ coin }: { coin: UserAsset }) => (
  <Link
    href={`/withdraw/${coin.id}`}
    className="flex items-center justify-between p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
  >
    <div className="flex items-center space-x-4">
      {/* We clone the icon to add classes */}
      {React.cloneElement(coin.icon)}
      <div>
        <p className="text-lg font-medium text-white">{coin.ticker}</p>
        <p className="text-sm text-gray-400">{coin.name}</p>
      </div>
    </div>
    <div>
      <p className="text-lg font-medium text-white text-right">
        {coin.balance.toLocaleString()}
      </p>
      <p className="text-sm text-gray-400 text-right">
        ≈ ${coin.usdValue.toFixed(2)}
      </p>
    </div>
  </Link>
);

// --- Main Client Component ---
export function WithdrawList({ assets }: { assets: UserAsset[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the list based on the search term
  const filteredCoins = useMemo(() => {
    return assets.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, assets]);

  return (
    <>
      {/* 2. Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coin"
            className="w-full bg-slate-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-0"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. Scrolling Coin List */}
      <div className="flex-grow p-4 space-y-3 overflow-y-auto">
        <p className="text-sm text-gray-400 mb-2">Select coin to withdraw:</p>
        {filteredCoins.map((coin) => (
          // We already pre-filtered for balance > 0 on the server
          <CoinItem key={coin.id} coin={coin} />
        ))}
        {filteredCoins.length === 0 && (
          <p className="text-center text-gray-500">No coins found.</p>
        )}
      </div>
    </>
  );
}
