import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_WC_PROJECT_ID is not set in .env.local");
}

// 2. Configure your desired chains
// Using 'as const' is great for type-safety!
const chains = [mainnet, sepolia] as const;

// 3. Create and export the Wagmi Config
export const wagmiConfig = getDefaultConfig({
  // Your app's name
  appName: "Bank Mockup Portfolio",

  // Your WalletConnect Project ID
  projectId,

  // The chains you want to support
  chains: chains,

  // This is critical for Next.js SSR to prevent hydration errors
  ssr: true,

  // The 'transports' property is now removed.
  // getDefaultConfig automatically creates a default http() transport
  // for every chain listed in the `chains` array.
  // You only need to add this property back if you want to
  // use a custom RPC URL (e.g., from Alchemy or Infura).
});
