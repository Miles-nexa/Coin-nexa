/* eslint-disable @typescript-eslint/no-explicit-any */
// app/deposit/[coinId]/page.tsx
"use client";

import {
  ChevronLeft,
  Info,
  AlertTriangle,
  Download,
  Share2,
  ArrowDownCircle,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { allCoinsList } from "@/lib/coinData";
import { formatCurrency } from "@/lib/mockData";
import { QRCodeSVG } from "qrcode.react";
import { CopyButton } from "@/components/CopyButton";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { SetAmountModal } from "@/components/SetAmountModal";

// Re-usable Action Icon component (no change)
const ActionIcon = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <div className="flex flex-col items-center space-y-2">
    <button
      onClick={onClick}
      className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-slate-600"
    >
      {icon}
    </button>
    <span className="text-sm text-gray-300">{label}</span>
  </div>
);

export default function DepositAddressPage() {
  const router = useRouter();
  const params = useParams();

  // State for modal and amount
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [copySuccess, setCopySuccess] = useState<string>(""); // --- ADDED --- State for share fallback

  // Find the coin data (no change)
  const coin = allCoinsList.find((c) => c.id === params.coinId);

  if (!coin) {
    // ... (no change to this block)
    return (
      <main className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
        <p>Coin not found.</p>
        <button onClick={() => router.back()} className="text-blue-400">
          Go Back
        </button>
      </main>
    );
  }

  // Calculate USD value (no change)
  const usdValue = (parseFloat(amount) || 0) * coin.priceUsd;

  // Update QR code value (no change)
  let qrValue = `${coin.protocolPrefix}:${coin.address}`;
  if (parseFloat(amount) > 0) {
    qrValue += `?amount=${amount}`;
  }

  // "Code-Only" QR Icon method (no change)
  // ... (no change to this block)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = coin.icon.type as any;
  const qrIconElement = <IconComponent color="white" size={24} />;
  const iconSvgString = ReactDOMServer.renderToString(qrIconElement);
  const finalSvg = `
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="${coin.color}" />
      <g transform="translate(12 12)">
        ${iconSvgString}
      </g>
    </svg>
  `;
  const iconDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(finalSvg)}`;
  // --- END OF METHOD ---

  // --- REPLACED --- This is the upgraded "smart" share function
  const handleShare = async () => {
    const shareTitle = `My ${coin.name} Address`;
    const shareUrl = window.location.href; // Get the current page URL
    const textToShare = amount
      ? `Please send ${amount} ${coin.ticker} to this address: ${coin.address}`
      : `Here is my ${coin.name} (${coin.ticker}) address: ${coin.address}`;

    // 1. Try Native Web Share
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: textToShare,
          url: shareUrl, // Pass the page URL
        });
      } catch (err: any) {
        console.error("Share failed:", err.message);
      }
    } else {
      // 2. Fallback to Copy to Clipboard
      try {
        await navigator.clipboard.writeText(textToShare);
        setCopySuccess("Copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message
      } catch (err: any) {
        console.error("Failed to copy:", err.message);
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 1. Header (no change) */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-white">Receive</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-800">
          <Info className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      {/* 2. Scrolling Content Area */}
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        {/* Warning Box (no change) */}
        <div className="flex items-start space-x-3 bg-yellow-600/10 text-yellow-500 p-3 rounded-lg border border-yellow-600/30">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Only send{" "}
            <strong>
              {coin.name} ({coin.ticker})
            </strong>{" "}
            assets to this address. Other assets will be lost forever.
          </p>
        </div>

        {/* Coin Label (no change) */}
        <div className="flex items-center space-x-2">
          {coin.icon}
          <span className="text-sm font-medium text-gray-300">{coin.name}</span>
        </div>

        {/* QR Code and Address (no change) */}
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg">
          <QRCodeSVG
            value={qrValue}
            size={220}
            // ... (all other props no change)
            imageSettings={{
              src: iconDataUri,
              height: 48,
              width: 48,
              excavate: false,
            }}
          />
          <p className="text-center text-sm text-gray-800 font-medium break-all mt-4">
            {coin.address}
          </p>
        </div>

        {/* Amount Display (no change) */}
        {parseFloat(amount) > 0 && (
          <div className="flex items-center justify-center gap-4 p-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-medium text-white">
                {amount} {coin.ticker}
              </span>
              <span className="text-xl text-gray-400">
                ≈ ${formatCurrency(usdValue)}
              </span>
            </div>

            <button
              onClick={() => setAmount("")}
              className="flex items-center justify-center w-5 h-5 
                                  rounded-full bg-green-500 text-white 
                                  hover:bg-green-600 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        )}

        {/* Action Icons (no change) */}
        <div className="flex justify-around pt-2">
          <ActionIcon
            label="Copy"
            icon={<CopyButton textToCopy={coin.address} />}
          />
          <ActionIcon
            label="Set Amount"
            icon={<Download className="w-6 h-6" />}
            onClick={() => setIsModalOpen(true)}
          />
          <ActionIcon
            label="Share"
            icon={<Share2 className="w-6 h-6" />}
            onClick={handleShare}
          />
        </div>

        {/* --- ADDED --- Feedback message for the share fallback */}
        {copySuccess && (
          <p className="text-center text-sm text-green-400 -mt-2">
            {copySuccess}
          </p>
        )}

        {/* Deposit from Exchange Button (no change) */}
        <div className="bg-slate-800 p-4 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-slate-700">
          <div className="p-2 bg-blue-600/20 rounded-full">
            <ArrowDownCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-medium">Deposit from exchange</p>
            <p className="text-sm text-gray-400">
              By direct transfer from your account
            </p>
          </div>
        </div>
      </div>

      {/* Modal (no change) */}
      {isModalOpen && (
        <SetAmountModal
          coin={coin}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(newAmount) => setAmount(newAmount)}
        />
      )}
    </main>
  );
}
