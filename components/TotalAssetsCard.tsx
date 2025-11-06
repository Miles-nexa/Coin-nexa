import { Flame } from "lucide-react";

type TotalAssetsCardProps = {
  user: string;
  level: number;
  totalAssets: number;
  availableBalance: number;
  freezeBalance: number;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export function TotalAssetsCard({
  user,
  level,
  totalAssets,
  availableBalance,
  freezeBalance,
}: TotalAssetsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br from-blue-900 to-indigo-950">
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_rgba(100,116,234,0.5)_0%,_transparent_50%)]" />

      <div className="relative z-10">
        {/* Header: "Hi, Rom88" and Level */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg text-gray-200">Hi, {user}</span>
          <div className="flex items-center space-x-1 bg-orange-600/50 text-orange-300 rounded-full px-3 py-1 text-sm">
            <Flame className="w-4 h-4" />
            <span>{level}</span>
          </div>
        </div>

        {/* Total Assets */}
        <div className="mb-6">
          <span className="text-sm text-gray-400">Total Assets (USDT)</span>
          <p className="text-4xl font-bold tracking-tight text-white mt-1">
            {formatCurrency(totalAssets)}
          </p>
        </div>

        {/* Available and Freeze Balances */}
        <div className="flex justify-between">
          <div>
            <span className="text-sm text-gray-400">Available Balance</span>
            <p className="text-lg font-medium text-white">
              {formatCurrency(availableBalance)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-400">Freeze Balance</span>
            <p className="text-lg font-medium text-white">
              {formatCurrency(freezeBalance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
