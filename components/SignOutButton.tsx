// components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-8 w-full p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors"
    >
      Sign Out
    </button>
  );
}
