// app/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Headphones,
  Info,
  Settings,
  UserCircle,
  CreditCard,
  Gift,
  Briefcase,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

// Helper component for list items
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);

// Helper component for menu links
const MenuLink = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <Link
    href={href}
    className="flex flex-col items-center justify-center space-y-2"
  >
    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-gray-300">
      {icon}
    </div>
    <span className="text-sm text-gray-300">{label}</span>
  </Link>
);

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  // Mask the email (e.g., "nwa***@****")
  const maskedEmail = session?.user?.email
    ? session.user.email.replace(
        /^(.)(.*)(@.*)$/,
        (_, a, b, c) => a + "*".repeat(b.length) + c
      )
    : "Loading...";

  // Mock UID
  const uid = "235184975";

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
        <div className="flex items-center space-x-4">
          <Headphones className="w-6 h-6 text-gray-300" />
          <Link href="/settings">
            <Settings className="w-6 h-6 text-gray-300" />
          </Link>
          <Info className="w-6 h-6 text-gray-300" />
        </div>
      </div>

      {/* 2. User Info Section */}
      <div className="p-4 space-y-4">
        <Link href="/settings" className="flex items-center space-x-3">
          <UserCircle className="w-16 h-16 text-gray-500" />
          <div>
            <h1 className="text-xl font-bold">{maskedEmail}</h1>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>UID: {uid}</span>
              <span>|</span>
              <span>Site: coin nexa</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 px-2 py-1 bg-green-700/50 text-green-300 text-xs rounded-full">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </span>
          <span className="px-2 py-1 bg-green-700 text-gray-300 text-xs rounded-full">
            VIP
          </span>
        </div>
      </div>

      {/* 3. VIP Unlock Card */}
      <div className="p-4">
        <div className="bg-slate-800 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-white">Unlock VIP 7 trial</h2>
          <p className="text-sm text-gray-300">
            Deposit 50,000,000 USDT to unlock a VIP 7 trial and enjoy exclusive
            perks!
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-400 cursor-pointer">
              VIP Benefits →
            </span>
            <Link
              href="/deposit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Deposit Now
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Menu Links */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <MenuLink
          icon={<CreditCard className="w-6 h-6" />}
          label="Nexa Card"
          href="#"
        />
        <MenuLink
          icon={<Gift className="w-6 h-6" />}
          label="Rewards Hub"
          href="#"
        />
      </div>

      {/* 5. Recently Used */}
      <div className="p-4 space-y-3">
        <h3 className="text-gray-400 text-sm font-medium">Recently used</h3>
        <Link
          href="/deposit"
          className="flex flex-col items-center -translate-x-36 space-y-1"
        >
          <Briefcase className="w-6 h-6 text-gray-300 " />
          <span className="text-xs text-gray-300">Deposit</span>
        </Link>
      </div>
    </main>
  );
}
