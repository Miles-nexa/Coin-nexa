// app/notifications/[id]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, mockNotifications } from "@/lib/mockData";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

// Re-usable row component for the details list
const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between items-start py-3">
    <span className="text-gray-400 text-sm">{label}</span>
    <div className="text-right text-sm text-white font-medium max-w-[70%]">
      {children}
    </div>
  </div>
);

export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams();

  // Find the notification based on the ID from the URL
  const notification = mockNotifications.find(
    (n) => n.id.toString() === params.id
  );

  if (!notification) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
        <p>Notification not found.</p>
      </main>
    );
  }

  const isPositive = notification.amount > 0;
  const title =
    notification.type === "deposit" ? "Deposit Details" : "Withdrawal Details";

  return (
    // 1. Use flex-col and h-screen to create a full-height viewport layout
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 2. Header (Sticky) */}
      <div className="flex items-center p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-white text-center flex-grow -ml-10">
          {title}
        </h1>
      </div>

      {/* 3. Main Scrolling Content Area */}
      {/* 'flex-grow' makes this div fill all available space
          'overflow-y-auto' makes only this section scroll
      */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Summary Card */}
        <div className="bg-slate-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-gray-400 text-sm">Quantity</span>
          <p className="text-3xl font-bold text-white my-2">
            {formatCurrency(Math.abs(notification.amount))}{" "}
            {notification.currency}
          </p>
          <div className="flex items-center space-x-1.5 text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">{notification.status}</span>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-slate-800 rounded-xl p-4 shadow-lg divide-y divide-gray-700">
          <DetailRow label="Withdrawal Account">
            {notification.account}
          </DetailRow>
          <DetailRow label="Fees">{notification.fees}</DetailRow>
          <DetailRow label="Chain Type">{notification.chainType}</DetailRow>
          <DetailRow label="Time">{notification.time}</DetailRow>
          <DetailRow label="Withdrawal Address">
            <div className="flex items-start space-x-2">
              <span className="break-all">{notification.address}</span>
              <CopyButton textToCopy={notification.address} />
            </div>
          </DetailRow>
          <DetailRow label="Transaction Hash">
            <div className="flex items-start space-x-2">
              <span className="break-all">{notification.txHash}</span>
              <CopyButton textToCopy={notification.txHash} />
            </div>
          </DetailRow>
        </div>
      </div>

      {/* 4. Footer Button (Pinned to bottom) */}
      {/* 'flex-shrink-0' stops this div from shrinking
          It now sits *outside* the scrollable area
      */}
      <div className="p-4 flex-shrink-0 border-t border-gray-800 bg-gray-900">
        <button className="w-full bg-slate-700 text-white font-medium py-3 rounded-xl hover:bg-slate-600 transition-colors">
          View in Blockchain Explorer
        </button>
      </div>
    </main>
  );
}
