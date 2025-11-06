// components/TransferForm.tsx
"use client";

import { AlertTriangle, ArrowDownUp, ChevronDown } from "lucide-react";
import React, { useState, useMemo } from "react";
import type { Coin } from "@/lib/coinData";

// --- Define the data type we'll receive from the server ---
export type UserAsset = Coin & {
  balances: {
    funding: number;
    trading: number;
  };
};

// --- Re-usable Form Group Component ---
const FormGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-300">{label}</label>
    {children}
  </div>
);

// --- Main Transfer Form Component ---
export function TransferForm({ assets }: { assets: UserAsset[] }) {
  // --- State ---
  const [fromAccount, setFromAccount] = useState<"funding" | "trading">(
    "funding"
  );
  const [toAccount, setToAccount] = useState<"funding" | "trading">("trading");
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default to the first coin the user has
  const [selectedTicker, setSelectedTicker] = useState<string>(
    assets[0]?.ticker || ""
  );

  // --- Memos & Calculations ---
  // Find the full coin object based on the selected ticker
  const selectedAsset = useMemo(
    () => assets.find((a) => a.ticker === selectedTicker),
    [assets, selectedTicker]
  );

  // Get the available balance from the correct account
  const availableBalance = selectedAsset?.balances[fromAccount] || 0;

  const amountNum = parseFloat(amount) || 0;
  const isConfirmDisabled =
    amountNum <= 0 || amountNum > availableBalance || fromAccount === toAccount;

  // --- Handlers ---
  const handleSwap = () => {
    setFromAccount(toAccount);
    setToAccount(fromAccount);
  };

  const handleSetMax = () => {
    setAmount(availableBalance.toString());
  };

  const handleConfirm = () => {
    // As requested, this just opens the error modal
    setIsModalOpen(true);
  };

  if (!selectedAsset) {
    return (
      <div className="p-4 text-center text-gray-400">
        You have no assets to transfer.
      </div>
    );
  }

  return (
    <>
      {/* 1. Scrolling Content Area */}
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        {/* From/To Account Selectors */}
        <div className="space-y-1 relative">
          <FormGroup label="From">
            <select
              value={fromAccount}
              onChange={(e) =>
                setFromAccount(e.target.value as "funding" | "trading")
              }
              className="w-full bg-slate-800 rounded-lg p-3 text-white border border-gray-700 appearance-none"
            >
              <option value="funding">Funding Account</option>
              <option value="trading">Unified Trading Account</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-[43px] pointer-events-none" />
          </FormGroup>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center border-4 border-gray-900"
          >
            <ArrowDownUp className="w-4 h-4 text-white" />
          </button>

          <FormGroup label="To">
            <select
              value={toAccount}
              onChange={(e) =>
                setToAccount(e.target.value as "funding" | "trading")
              }
              className="w-full bg-slate-800 rounded-lg p-3 text-white border border-gray-700 appearance-none"
            >
              <option value="funding">Funding Account</option>
              <option value="trading">Unified Trading Account</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-[125px] pointer-events-none" />
          </FormGroup>
          {fromAccount === toAccount && (
            <p className="text-xs text-red-500">
              &apos;From&apos; and &apos;To&apos; accounts cannot be the same.
            </p>
          )}
        </div>

        {/* Coin Selector */}
        <FormGroup label="Coin">
          <div className="relative">
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="w-full bg-slate-800 rounded-lg p-3 text-white border border-gray-700 appearance-none"
            >
              {assets.map((asset) => (
                <option key={asset.ticker} value={asset.ticker}>
                  {asset.ticker} - {asset.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-[13px] pointer-events-none" />
          </div>
        </FormGroup>

        {/* Amount */}
        <FormGroup label="Amount">
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Please enter"
              className="w-full bg-slate-800 rounded-lg p-3 pr-24 text-white placeholder-gray-500 border border-gray-700"
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
              <span className="text-white font-medium">
                {selectedAsset.ticker}
              </span>
              <span className="text-gray-400">|</span>
              <button
                onClick={handleSetMax}
                className="text-blue-400 font-medium"
              >
                Max
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Available: {availableBalance.toLocaleString()}{" "}
            {selectedAsset.ticker}
          </p>
        </FormGroup>
      </div>

      {/* 2. Action Button */}
      <div className="p-4 flex-shrink-0 bg-gray-900 border-t border-gray-700">
        <button
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
          className="w-full p-4 rounded-lg font-semibold text-lg
                     bg-green-600 text-white
                     disabled:bg-gray-700 disabled:text-gray-500
                     transition-colors"
        >
          Confirm
        </button>
      </div>

      {/* 3. Error Modal (Same as Withdraw) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-lg border border-slate-700">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-white mb-2">
              Transfer Unsuccessful
            </h3>
            <p className="text-sm text-gray-300 text-center mb-6">
              Due to restrictions placed on the account, this action could not
              be completed. Please contact customer care for assistance.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full p-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
