// components/SetAmountModal.tsx
"use client";

import { X } from "lucide-react";
import React, { useState } from "react";
import { Coin } from "@/lib/coinData";
import { formatCurrency } from "@/lib/mockData";

interface SetAmountModalProps {
  coin: Coin;
  onClose: () => void;
  onConfirm: (amount: string) => void;
}

export function SetAmountModal({
  coin,
  onClose,
  onConfirm,
}: SetAmountModalProps) {
  // Internal state to manage the input
  const [localAmount, setLocalAmount] = useState("");

  const usdValue = (parseFloat(localAmount) || 0) * coin.priceUsd;

  const handleConfirm = () => {
    onConfirm(localAmount); // Send the amount back to the parent page
    onClose(); // Close the modal
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Set Amount</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              className="w-full bg-slate-700 text-white placeholder-gray-500 
                         border-none rounded-xl py-4 pr-20 pl-2 text-2xl font-medium"
              value={localAmount}
              onChange={(e) => setLocalAmount(e.target.value)}
              autoFocus // Automatically focus the input
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-medium text-gray-400">
              {coin.ticker}
            </span>
          </div>

          <button
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl 
                       hover:bg-blue-500 transition-colors disabled:opacity-50"
            onClick={handleConfirm}
            disabled={parseFloat(localAmount) <= 0}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
