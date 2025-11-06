// components/WithdrawForm.tsx
"use client";

import { BookUser, ScanLine, ChevronDown, AlertTriangle } from "lucide-react";
import React, { useState, useMemo } from "react";
import type { Coin } from "@/lib/coinData";

// --- Re-usable Form Group Component ---
const FormGroup = ({
  label,
  children,
  htmlFor,
  labelAddon,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
  labelAddon?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      {labelAddon}
    </div>
    {children}
  </div>
);

// --- Re-usable Info Row Component ---
const InfoRow = ({
  label,
  value,
  valueAddon,
}: {
  label: string;
  value: React.ReactNode;
  valueAddon?: React.ReactNode;
}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <div className="flex items-center space-x-2">
      {valueAddon}
      <span className="text-white font-medium">{value}</span>
    </div>
  </div>
);

// Define the props our form will receive from the server
type WithdrawFormProps = {
  coin: Coin; // The static coin data (networks, icon, etc.)
  balances: {
    funding: number;
    trading: number;
  };
};

export function WithdrawForm({ coin, balances }: WithdrawFormProps) {
  // --- All state lives here in the client ---
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<"funding" | "trading">(
    "trading"
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // --- Calculations ---
  const selectedNetwork = useMemo(
    () => coin.networks.find((n) => n.id === selectedNetworkId),
    [coin.networks, selectedNetworkId]
  );

  // Read available balance from the 'balances' prop
  const availableBalance = balances[selectedAccount];

  const amountNum = parseFloat(amount) || 0;
  const fee = selectedNetwork?.fee || 0;
  const amountReceived = amountNum > fee ? amountNum - fee : 0;

  // --- Validation ---
  const isWithdrawDisabled =
    !address ||
    !selectedNetworkId ||
    amountNum <= 0 ||
    amountNum > availableBalance;

  // --- Handlers ---
  const handleSetMax = () => {
    setAmount(availableBalance.toString());
  };

  const handleWithdraw = () => {
    // This just opens the modal as requested
    setIsErrorModalOpen(true);
  };

  return (
    <>
      {/* 1. Scrolling Content Area */}
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        {/* Coin Selection - Now just a disabled input showing the coin */}
        <FormGroup label="Coin" htmlFor="coin-select">
          <div className="relative">
            <input
              id="coin-select"
              disabled
              value={`${coin.ticker} - ${coin.name}`}
              className="w-full bg-slate-800 rounded-lg p-3 text-white border border-gray-700 opacity-70"
            />
          </div>
        </FormGroup>

        {/* Address */}
        <FormGroup
          label="Address"
          htmlFor="address"
          labelAddon={
            <div className="flex items-center space-x-1 text-blue-400 cursor-pointer">
              <BookUser className="w-4 h-4" />
              <span className="text-sm font-medium">Address Book</span>
            </div>
          }
        >
          <div className="relative">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Input or press and hold to paste..."
              className="w-full bg-slate-800 rounded-lg p-3 pr-10 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-0"
            />
            <ScanLine className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>
        </FormGroup>

        {/* Network */}
        <FormGroup label="Network" htmlFor="network">
          <div className="relative">
            <select
              id="network"
              value={selectedNetworkId}
              onChange={(e) => setSelectedNetworkId(e.target.value)}
              className="w-full bg-slate-800 rounded-lg p-3 text-white border border-gray-700 focus:border-blue-500 focus:ring-0 appearance-none"
            >
              <option value="" disabled>
                Please choose a chain type
              </option>
              {coin.networks.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </FormGroup>

        {/* Amount */}
        <FormGroup label="Amount" htmlFor="amount">
          <div className="relative">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min. Withdrawal: 0.001`}
              className="w-full bg-slate-800 rounded-lg p-3 pr-24 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
              <span className="text-white font-medium">{coin.ticker}</span>
              <span className="text-gray-400">|</span>
              <button
                onClick={handleSetMax}
                className="text-blue-400 font-medium"
              >
                Max
              </button>
            </div>
          </div>
        </FormGroup>

        {/* Account Selection (Reads from 'balances' prop) */}
        <div className="bg-slate-800 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="text-sm text-white font-medium">
              Select account
            </span>
            <span className="text-sm text-gray-400">
              {availableBalance.toLocaleString()} {coin.ticker}
            </span>
          </div>
          <label className="flex justify-between items-center p-3 cursor-pointer">
            <p className="text-sm text-white">Funding</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white">
                {balances.funding.toLocaleString()}
              </span>
              <input
                type="radio"
                name="account"
                value="funding"
                checked={selectedAccount === "funding"}
                onChange={() => setSelectedAccount("funding")}
                className="w-4 h-4 text-blue-500 bg-gray-900 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
              />
            </div>
          </label>
          <label className="flex justify-between items-center p-3 cursor-pointer border-t border-gray-700">
            <p className="text-sm text-white">Unified Trading</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white">
                {balances.trading.toLocaleString()}
              </span>
              <input
                type="radio"
                name="account"
                value="trading"
                checked={selectedAccount === "trading"}
                onChange={() => setSelectedAccount("trading")}
                className="w-4 h-4 text-blue-500 bg-gray-900 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
              />
            </div>
          </label>
        </div>

        {/* Note / Summary */}
        <div className="space-y-3">
          <InfoRow
            label="Daily Remaining Limit"
            value="2,000,000/2,000,000 USDT"
          />
          <InfoRow
            label="Withdrawal Fees"
            value={
              selectedNetwork ? `${fee} ${selectedNetwork.feeTicker}` : "N/A"
            }
          />
          <InfoRow
            label="Amount Received"
            value={`${amountReceived.toFixed(8)} ${coin.ticker}`}
            valueAddon={
              <span className="text-sm text-blue-400 cursor-pointer">
                Setting
              </span>
            }
          />
        </div>
      </div>

      {/* 2. Action Button */}
      <div className="p-4 flex-shrink-0 bg-gray-900 border-t border-gray-700">
        <button
          onClick={handleWithdraw}
          disabled={isWithdrawDisabled}
          className="w-full p-4 rounded-lg font-semibold text-lg
                     bg-green-600 text-white
                     disabled:bg-gray-700 disabled:text-gray-500
                     transition-colors"
        >
          Withdraw
        </button>
      </div>

      {/* 3. Error Modal */}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-lg border border-slate-700">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-white mb-2">
              Withdrawal Unsuccessful
            </h3>
            <p className="text-sm text-gray-300 text-center mb-6">
              Due to restrictions placed on the account, this action could not
              be completed. Please contact customer care for assistance.
            </p>
            <button
              onClick={() => setIsErrorModalOpen(false)}
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
