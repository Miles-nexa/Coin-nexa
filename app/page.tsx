import { Header } from "@/components/Header";
import { TotalAssetsCard } from "@/components/TotalAssetsCard";
import { ActionsRow } from "@/components/ActionsRow";
import { CollectionStats } from "@/components/CollectionStats";
import { FinancingSection } from "@/components/FinancingSection";
import { InformationSection } from "@/components/InformationSection";
import { NoticeSection } from "@/components/NoticeSection";
import { SignOutButton } from "@/components/SignOutButton";
import { auth } from "@/auth";
import { supabaseServer } from "@/lib/supabase";
import { allCoinsList } from "@/lib/coinData";
import { redirect } from "next/navigation";

const createPriceMap = () => {
  const map = new Map<string, number>();
  allCoinsList.forEach((coin) => {
    map.set(coin.ticker, coin.priceUsd);
  });
  return map;
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const priceMap = createPriceMap();

  const userPromise = supabaseServer
    .from("users")
    .select("name, level, show_special_notice")
    .eq("id", userId)
    .single();

  const walletsPromise = supabaseServer
    .from("wallets")
    .select("coin_ticker, funding_balance, trading_balance")
    .eq("user_id", userId);

  const [userResult, walletsResult] = await Promise.all([
    userPromise,
    walletsPromise,
  ]);

  const user = userResult.data || {
    name: session.user.email,
    level: 1,
    show_special_notice: false,
  };

  let totalAssets = 0;
  let availableBalance = 0;
  let freezeBalance = 0;
  if (walletsResult.data) {
    for (const wallet of walletsResult.data) {
      const price = priceMap.get(wallet.coin_ticker) || 0;
      const fundingValue = Number(wallet.funding_balance) * price;
      const tradingValue = Number(wallet.trading_balance) * price;
      freezeBalance += fundingValue;
      availableBalance += tradingValue;
      totalAssets += fundingValue + tradingValue;
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-8 max-w-md mx-auto pb-8">
      <Header />
      <TotalAssetsCard
        user={user.name || "User"}
        level={user.level || 1}
        totalAssets={totalAssets}
        availableBalance={availableBalance}
        freezeBalance={freezeBalance}
      />
      <ActionsRow />
      <CollectionStats />
      <FinancingSection />
      <InformationSection />

      {user.show_special_notice && <NoticeSection />}

      <SignOutButton />
    </main>
  );
}
