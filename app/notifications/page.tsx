// app/notifications/page.tsx
"use client"; // 1. Re-add 'use client'

import { ArrowDownToLine, ArrowUpFromLine, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 2. Import useRouter
import { formatCurrency, mockNotifications } from "@/lib/mockData";

// --- NotificationItem sub-component (No changes here) ---
const NotificationItem = ({
  notification,
}: {
  notification: (typeof mockNotifications)[0];
}) => {
  const isPositive = notification.amount > 0;
  const amountString =
    (isPositive ? "+" : "") + formatCurrency(notification.amount);
  const usdString =
    (isPositive ? "+" : "-") +
    "$" +
    formatCurrency(Math.abs(notification.amount));

  return (
    <Link href={`/notifications/${notification.id}`}>
      <li className="flex items-center justify-between py-4 border-b border-gray-700 hover:bg-slate-800 transition-colors cursor-pointer px-4 -mx-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-full ${
              isPositive ? "bg-green-600/20" : "bg-red-600/20"
            }`}
          >
            {isPositive ? (
              <ArrowDownToLine className="w-5 h-5 text-green-400" />
            ) : (
              <ArrowUpFromLine className="w-5 h-5 text-red-400" />
            )}
          </div>
          <div>
            <p className="text-white font-medium">
              {notification.type === "deposit" ? "Received" : "Sent"}{" "}
              {notification.currency}
            </p>
            <p
              className={`text-sm ${
                notification.status === "Completed"
                  ? "text-gray-400"
                  : "text-yellow-400"
              }`}
            >
              {notification.status}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {amountString} {notification.currency}
          </p>
          <p className="text-sm text-gray-400">{usdString}</p>
        </div>
      </li>
    </Link>
  );
};
// --- End of sub-component ---

// --- This is the main Page component ---
export default function NotificationsPage() {
  const router = useRouter(); // 3. Initialize the router

  return (
    <main className="min-h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 4. Add the Header with Back Button */}
      <div className="flex items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button
          onClick={() => router.back()} // Go back to the dashboard
          className="p-2 -ml-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-white text-center flex-grow -ml-10">
          Notifications
        </h1>
      </div>

      {/* Notification List */}
      <ul className="px-4">
        {mockNotifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </ul>
    </main>
  );
}
