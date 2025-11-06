// app/deposit/page.tsx
"use client";

import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { allCoinsList, Coin } from "@/lib/coinData";

// (Your icon imports are no longer needed here, they are in coinData.ts)

// 2. Derive your lists from the imported data
const recommendedCoinIds = ["btc", "eth", "sol", "usdt", "ton"];

const recommendedCoinList = allCoinsList.filter((coin) =>
  recommendedCoinIds.includes(coin.id)
);
const otherAssetsList = allCoinsList.filter(
  (coin) => !recommendedCoinIds.includes(coin.id)
);

export default function DepositPage() {
  const router = useRouter();
  const [selectedCoinId, setSelectedCoinId] = useState(
    recommendedCoinList[0].id
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecommendedList = recommendedCoinList.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOtherAssetsList = otherAssetsList.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. THIS IS THE KEY CHANGE
  const handleConfirm = () => {
    // Navigate to the new dynamic page with the selected coin's ID
    router.push(`/deposit/${selectedCoinId}`);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 1. Header with Back Button (no change) */}
      <div className="flex items-center p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-white text-center flex-grow -ml-10">
          Select Coin to Deposit
        </h1>
      </div>

      {/* 2. Main Content (Scrollable) */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Search Bar (no change) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search coin name..."
            className="w-full bg-slate-800 text-white placeholder-gray-500 
                       border-none rounded-xl py-3 pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>

        {/* "Recommended" List Section (no change) */}
        <h2 className="text-sm text-gray-400 font-medium pt-2">Recommended</h2>
        <div className="space-y-2">
          {filteredRecommendedList.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer
                          transition-all ${
                            selectedCoinId === coin.id
                              ? "bg-blue-600/20 ring-2 ring-blue-500"
                              : "bg-slate-800 hover:bg-slate-700"
                          }`}
            >
              <div className="flex items-center space-x-4">
                {coin.icon}
                <div>
                  <p className="text-lg font-semibold text-white">
                    {coin.name}
                  </p>
                  <p className="text-sm text-gray-400">{coin.ticker}</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center
                          ${
                            selectedCoinId === coin.id
                              ? "bg-blue-500"
                              : "bg-gray-700"
                          }`}
              >
                {selectedCoinId === coin.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          ))}
          {filteredRecommendedList.length === 0 && (
            <p className="text-center text-gray-500">
              No recommended coins found.
            </p>
          )}
        </div>

        {/* "All Assets" List (no change) */}
        <h2 className="text-sm text-gray-400 font-medium pt-2">All Assets</h2>
        <div className="space-y-2">
          {filteredOtherAssetsList.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer
                          transition-all ${
                            selectedCoinId === coin.id
                              ? "bg-blue-600/20 ring-2 ring-blue-500"
                              : "bg-slate-800 hover:bg-slate-700"
                          }`}
            >
              <div className="flex items-center space-x-4">
                {coin.icon}
                <div>
                  <p className="text-lg font-semibold text-white">
                    {coin.name}
                  </p>
                  <p className="text-sm text-gray-400">{coin.ticker}</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center
                          ${
                            selectedCoinId === coin.id
                              ? "bg-blue-500"
                              : "bg-gray-700"
                          }`}
              >
                {selectedCoinId === coin.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          ))}
          {filteredOtherAssetsList.length === 0 && searchTerm.length > 0 && (
            <p className="text-center text-gray-500">
              No other assets match your search.
            </p>
          )}
        </div>
      </div>

      {/* 3. Footer Button */}
      <div className="p-4 flex-shrink-0 border-t border-gray-800 bg-gray-900">
        <button
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl 
                     hover:bg-blue-500 transition-colors disabled:opacity-50"
          onClick={handleConfirm} // This now navigates!
        >
          Confirm
        </button>
      </div>
    </main>
  );
}
