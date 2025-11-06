// app/withdraw/[coinId]/page.tsx
import { auth } from "@/auth";
import { supabaseServer } from "@/lib/supabase";
import { allCoinsList } from "@/lib/coinData";
import { redirect } from "next/navigation";
import { WithdrawForm } from "@/components/WithdrawForm";
import { PageHeader } from "@/components/PageHeader";

// 1. Update the type of 'params' to be a Promise
export default async function WithdrawPage({
  params,
}: {
  params: Promise<{ coinId: string }>;
}) {
  // 2. Await the 'params' prop to get the resolved object
  const resolvedParams = await params;

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 3. Get static coin data using the resolvedParams
  const coin = allCoinsList.find((c) => c.id === resolvedParams.coinId);
  if (!coin) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
        <PageHeader title="Error" />
        <p className="p-4">Coin not found.</p>
      </main>
    );
  }

  // 4. Get user's dynamic balance data for this one coin
  const { data: wallet } = await supabaseServer
    .from("wallets")
    .select("funding_balance, trading_balance")
    .eq("user_id", session.user.id)
    .eq("coin_ticker", coin.ticker) // Fetch only this coin's wallet
    .single();

  // 5. Prepare balances (default to 0 if no wallet found)
  const balances = {
    funding: Number(wallet?.funding_balance) || 0,
    trading: Number(wallet?.trading_balance) || 0,
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto">
      <PageHeader title="Withdraw" />

      {/* 6. Render the Client Component with the fetched data */}
      <WithdrawForm coin={coin} balances={balances} />
    </main>
  );
}
