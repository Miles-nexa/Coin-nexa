// app/withdraw/page.tsx
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth"; // Server-side auth
import { supabaseServer } from "@/lib/supabase"; // Server-side Supabase
import { allCoinsList } from "@/lib/coinData"; // Static coin info
import type { Coin } from "@/lib/coinData";
import { PageHeader } from "@/components/PageHeader"; // Our new header
import { WithdrawList } from "@/components/WithdrawList"; // Our new client list

const coinMap = new Map<string, Coin>(
  allCoinsList.map((coin) => [coin.ticker, coin])
);

export default async function SelectWithdrawCoinPage() {
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
    // You could render an error message here
  }

  // 2. Combine Supabase data with static coin data
  const userAssets = (wallets || [])
    .map((wallet) => {
      const coin = coinMap.get(wallet.coin_ticker);
      if (!coin) return null; // Skip if coin not in our static list

      const totalBalance =
        Number(wallet.funding_balance) + Number(wallet.trading_balance);
      const usdValue = totalBalance * coin.priceUsd;

      return {
        ...coin, // Spread all static coin info (id, name, icon, etc.)
        balance: totalBalance,
        usdValue: usdValue,
      };
    })
    .filter(
      (asset): asset is NonNullable<typeof asset> =>
        asset !== null && asset.balance > 0 // Only show coins with a balance
    );

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      {/* 1. Re-usable Server-Side Header */}
      <PageHeader title="Withdraw" />

      {/* 2. The Interactive Client Component */}
      <WithdrawList assets={userAssets} />
    </main>
  );
}
