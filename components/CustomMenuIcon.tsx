import React from "react";

const IconRow = () => (
  <div className="flex items-center space-x-1">
    <div className="w-1 h-1 bg-current rounded-full" />
    <div className="w-6 h-1 bg-current rounded-full" />
  </div>
);

interface CustomMenuIconProps {
  className?: string;
}

export function CustomMenuIcon({ className }: CustomMenuIconProps) {
  const glowFilter = `drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))`; // blue-400 at 60%

  return (
    <div
      className={`flex flex-col space-y-1 ${className}`}
      style={{ filter: glowFilter }}
    >
      <IconRow />
      <IconRow />
      <IconRow />
    </div>
  );
}
