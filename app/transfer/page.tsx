import { auth } from "@/auth";
import { supabaseServer } from "@/lib/supabase";
import { allCoinsList } from "@/lib/coinData";
import type { Coin } from "@/lib/coinData";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { TransferForm } from "@/components/TransferForm";
import type { UserAsset } from "@/components/TransferForm";

// Create a map for quick price/icon lookups
const coinMap = new Map<string, Coin>(
  allCoinsList.map((coin) => [coin.ticker, coin])
);

export default async function TransferPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 1. Fetch user's wallets from Supabase
  const { data: wallets, error } = await supabaseServer
    .from("wallets")
    .select("coin_ticker, funding_balance, trading_balance")
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error fetching wallets:", error);
  }

  const userAssets: UserAsset[] = (wallets || [])
    .map((wallet) => {
      const coin = coinMap.get(wallet.coin_ticker);
      if (!coin) return null; // Skip if coin not in our static list

      const fundingBalance = Number(wallet.funding_balance);
      const tradingBalance = Number(wallet.trading_balance);

      if (fundingBalance + tradingBalance <= 0) {
        return null;
      }

      return {
        ...coin, // Spread all static coin info (id, name, icon, etc.)
        balances: {
          funding: fundingBalance,
          trading: tradingBalance,
        },
      };
    })
    .filter((asset): asset is NonNullable<typeof asset> => asset !== null);

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      <PageHeader title="Transfer" />

      {/* 3. Render the Client Component with the fetched asset data */}
      <TransferForm assets={userAssets} />
    </main>
  );
}
