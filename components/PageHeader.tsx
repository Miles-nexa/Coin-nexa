// components/PageHeader.tsx
"use client"; // This component needs 'use client' for the router
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function PageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex-shrink-0">
      <button
        onClick={() => router.back()}
        className="p-2 -ml-2 rounded-full hover:bg-gray-800"
      >
        <ChevronLeft className="w-6 h-6 text-gray-300" />
      </button>
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <div className="w-6 h-6 p-2" /> {/* Placeholder for layout */}
    </div>
  );
}
