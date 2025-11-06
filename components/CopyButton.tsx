"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    // Reset icon after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Link
      href="#"
      onClick={handleCopy}
      className="text-gray-400 hover:text-white"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Link>
  );
}
