// components/Header.tsx
import { Mail, UserCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth"; // <-- 1. Import server-side auth
import { supabaseServer } from "@/lib/supabase"; // <-- 2. Import Supabase

export async function Header() {
  // <-- 3. Make component async

  // 4. Get session and notification count
  const session = await auth();
  let notificationCount = 0;

  if (session?.user?.id) {
    // Fetch the count of notifications for this user
    const { count, error } = await supabaseServer
      .from("notifications")
      .select("id", { count: "exact", head: true }) // 'head:true' just gets the count
      .eq("user_id", session.user.id);

    if (count) {
      notificationCount = count;
    }
  }

  return (
    <nav className="flex items-center justify-between w-full py-4 mb-4">
      {/* Left Side: User Icon (links to /profile) */}
      <Link
        href="/profile"
        className="p-2 cursor-pointer transition-opacity hover:opacity-80"
      >
        <UserCircle className="w-8 h-8 text-gray-400" />
      </Link>

      {/* Right Side: Mail and Language (UNCHANGED) */}
      <div className="flex items-center space-x-4">
        <Link
          href="/notifications"
          className="relative p-0.5 cursor-pointer transition-opacity hover:opacity-80"
        >
          <Mail className="w-6 h-6 text-gray-300" />

          {/* 5. Conditionally render the badge */}
          {notificationCount > 0 && (
            <span
              className="absolute top-0 right-0 flex items-center justify-center 
                                w-5 h-5 bg-red-600 text-white text-xs 
                                rounded-full border-2 border-gray-900
                                transform translate-x-1/2 -translate-y-1.5"
            >
              {notificationCount}
            </span>
          )}
        </Link>

        {/* Language Selector (UNCHANGED) */}
        <div className="flex items-center space-x-1 cursor-pointer transition-opacity hover:opacity-80">
          <span className="text-sm text-gray-300">English</span>
        </div>
      </div>
    </nav>
  );
}
