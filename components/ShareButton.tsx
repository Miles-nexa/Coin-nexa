/* eslint-disable @typescript-eslint/no-explicit-any */
// /components/ShareButton.tsx
import React, { useState } from "react";

// 1. Define the props interface
interface ShareButtonProps {
  title?: string; // Optional title
  text?: string; // Optional text
  url?: string; // Optional URL
}

// 2. Use React.FC (Functional Component) and the props interface
const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  // 3. useState is strongly typed (inferred as string)
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Use the current page's URL if no specific URL is provided
  const shareUrl = url || window.location.href;

  const handleShare = async () => {
    // Check if the Web Share API is available on the navigator object
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          text: text || "Check this out!",
          url: shareUrl,
        });
      } catch (err: any) {
        // Catch potential errors
        console.error("Share failed:", err.message);
      }
    } else {
      // Fallback to clipboard for desktop or unsupported browsers
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess("Copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message
      } catch (err: any) {
        console.error("Failed to copy link:", err.message);
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleShare}
        className="your-button-styles" // Add your Tailwind classes here
      >
        Share
      </button>

      {copySuccess && (
        <span className="ml-2 text-sm text-gray-500">{copySuccess}</span>
      )}
    </div>
  );
};

export default ShareButton;
