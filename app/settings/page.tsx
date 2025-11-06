// app/settings/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Moon,
  Globe,
  UserCircle,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

// Helper component for settings links
const SettingsLink = ({
  label,
  value,
  href,
}: {
  label: string;
  value: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    className="flex items-center justify-between py-4 border-b border-gray-700"
  >
    <span className="text-white text-md">{label}</span>
    <div className="flex items-center space-x-2">
      <span className="text-gray-400 text-sm">{value}</span>
      <ChevronRight className="w-5 h-5 text-gray-500" />
    </div>
  </Link>
);

export default function SettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const maskedEmail = session?.user?.email
    ? session.user.email.replace(
        /^(.)(.*)(@.*)$/,
        (_, a, b, c) => a + "*".repeat(b.length) + c
      )
    : "Loading...";

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 1. Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold">User Center</h1>
        <div className="flex items-center space-x-4">
          <Moon className="w-6 h-6 text-gray-300" />
          <Globe className="w-6 h-6 text-gray-300" />
        </div>
      </div>

      {/* 2. User Info */}
      <div className="p-4 flex items-center space-x-3">
        <UserCircle className="w-16 h-16 text-gray-500" />
        <div>
          <h2 className="text-xl font-bold">{maskedEmail}</h2>
          <span className="text-xs text-gray-400">Site: Coin Nexa</span>
        </div>
      </div>

      {/* 3. Security Level */}
      <div className="p-4">
        <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-green-500" />
            <div>
              <span className="text-sm text-gray-300">Security level</span>
              <p className="text-green-500 font-medium">High</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          All authentication methods enabled.
        </p>
      </div>

      {/* 4. Settings TABS (mock) */}
      <div className="px-4 flex items-center space-x-6 border-b border-gray-700">
        <button className="py-3 text-white font-medium border-b-2 border-white">
          My info
        </button>
      </div>

      {/* 5. Settings Links */}
      <div className="px-4">
        <SettingsLink label="Profile Picture" value="" href="#" />
        <SettingsLink label="Nickname" value={maskedEmail} href="#" />
        <SettingsLink label="UID" value="235184975" href="#" />
        <SettingsLink
          label="Identity Verification"
          value="Lv.6 Verified"
          href="#"
        />
        <SettingsLink label="Security" value="2FA Verification" href="#" />
        <SettingsLink label="VIP level" value="VIP" href="#" />
        <SettingsLink label="My Fee Rates" value="" href="#" />
      </div>

      {/* 6. Log Out Button */}
      <div className="p-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
