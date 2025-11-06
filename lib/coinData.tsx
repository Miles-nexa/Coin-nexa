// lib/coinData.ts
import React from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import type { IconBaseProps } from "react-icons"; // For fixing the icon type
import {
  SiTether,
  SiTon,
  SiSolana,
  SiBinance,
  SiChainlink,
  SiCardano,
  SiPolkadot,
  SiRipple,
  SiStellar,
  SiMonero,
  SiAlgorand,
  SiDogecoin,
  SiLitecoin,
} from "react-icons/si";

// Define the Network type (This is static info, so it stays)
export type CoinNetwork = {
  id: string;
  name: string;
  fee: number;
  feeTicker: string;
};

// Updated Coin type
// 'balance' and 'balances' have been REMOVED.
export type Coin = {
  id: string;
  name: string;
  ticker: string;
  icon: React.ReactElement<IconBaseProps>; // Using the correct type
  address: string;
  protocolPrefix: string;
  color: string;
  priceUsd: number;
  networks: CoinNetwork[];
};

// --- All user-specific data and calculations are REMOVED ---

export const allCoinsList: Coin[] = [
  {
    id: "btc",
    name: "Bitcoin",
    ticker: "BTC",
    icon: <FaBitcoin className="w-8 h-8 text-orange-500" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#F7931A",
    priceUsd: 106459.46,
    networks: [
      { id: "btc", name: "Bitcoin", fee: 0.00005, feeTicker: "BTC" },
      { id: "ln", name: "Lightning", fee: 0, feeTicker: "BTC" },
    ],
  },
  {
    id: "usdt",
    name: "Tether (ERC-20)",
    ticker: "USDT",
    icon: <SiTether className="w-8 h-8 text-green-500" />,
    address: "0xf92731b0E99E972E4322887cF43285F89Ac9a025",
    protocolPrefix: "ethereum",
    color: "#26A17B",
    priceUsd: 1.0,
    networks: [
      { id: "erc20", name: "Ethereum (ERC20)", fee: 1.5, feeTicker: "USDT" },
      { id: "trc20", name: "Tron (TRC20)", fee: 1, feeTicker: "USDT" },
      { id: "sol", name: "Solana", fee: 0.5, feeTicker: "USDT" },
    ],
  },
  {
    id: "eth",
    name: "Ethereum",
    ticker: "ETH",
    icon: <FaEthereum className="w-8 h-8 text-gray-400" />,
    address: "0xf92731b0E99E972E4322887cF43285F89Ac9a025",
    protocolPrefix: "ethereum",
    color: "#627EEA",
    priceUsd: 3596.117,
    networks: [
      { id: "erc20", name: "Ethereum (ERC20)", fee: 0.001, feeTicker: "ETH" },
      { id: "arbitrum", name: "Arbitrum One", fee: 0.0001, feeTicker: "ETH" },
    ],
  },
  {
    id: "sol",
    name: "Solana",
    ticker: "SOL",
    icon: <SiSolana className="w-8 h-8 text-purple-500" />,
    address: "GjtNvcVHypaoWtu66eekWuJs7vzDTrZuU8SWqgZVfPbK",
    protocolPrefix: "solana",
    color: "#9945FF",
    priceUsd: 165.396,
    networks: [{ id: "sol", name: "Solana", fee: 0.0001, feeTicker: "SOL" }],
  },
  {
    id: "ton",
    name: "Toncoin (ERC-20)",
    ticker: "TON",
    icon: <SiTon className="w-8 h-8 text-blue-500" />,
    address: "0xf92731b0E99E972E4322887cF43285F89Ac9a025",
    protocolPrefix: "ethereum",
    color: "#0098EA",
    priceUsd: 10.25,
    networks: [
      { id: "erc20", name: "Ethereum (ERC20)", fee: 0.1, feeTicker: "TON" },
    ],
  },
  {
    id: "bnb",
    name: "BNB (BEP-20)",
    ticker: "BNB",
    icon: <SiBinance className="w-8 h-8 text-yellow-500" />,
    address: "0xf92731b0E99E972E4322887cF43285F89Ac9a025",
    protocolPrefix: "ethereum",
    color: "#F0B90B",
    priceUsd: 750.0,
    networks: [
      {
        id: "bep20",
        name: "BNB Smart Chain (BEP20)",
        fee: 0.001,
        feeTicker: "BNB",
      },
    ],
  },
  {
    id: "doge",
    name: "Dogecoin",
    ticker: "DOGE",
    icon: <SiDogecoin className="w-8 h-8 text-yellow-500" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#C2A633",
    priceUsd: 0.25,
    networks: [{ id: "doge", name: "Dogecoin", fee: 2, feeTicker: "DOGE" }],
  },
  {
    id: "ltc",
    name: "Litecoin",
    ticker: "LTC",
    icon: <SiLitecoin className="w-8 h-8 text-gray-400" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#A6A9AA",
    priceUsd: 150.0,
    networks: [{ id: "ltc", name: "Litecoin", fee: 0.001, feeTicker: "LTC" }],
  },
  {
    id: "link",
    name: "Chainlink",
    ticker: "LINK",
    icon: <SiChainlink className="w-8 h-8 text-blue-600" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#375BD2",
    priceUsd: 30.0,
    networks: [
      { id: "erc20", name: "Ethereum (ERC20)", fee: 0.2, feeTicker: "LINK" },
    ],
  },
  {
    id: "ada",
    name: "Cardano",
    ticker: "ADA",
    icon: <SiCardano className="w-8 h-8 text-blue-400" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#0033AD",
    priceUsd: 0.8,
    networks: [{ id: "cardano", name: "Cardano", fee: 0.1, feeTicker: "ADA" }],
  },
  {
    id: "dot",
    name: "Polkadot",
    ticker: "DOT",
    icon: <SiPolkadot className="w-8 h-8 text-pink-500" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#E6007A",
    priceUsd: 12.0,
    networks: [{ id: "dot", name: "Polkadot", fee: 0.01, feeTicker: "DOT" }],
  },
  {
    id: "xrp",
    name: "Ripple",
    ticker: "XRP",
    icon: <SiRipple className="w-8 h-8 text-blue-300" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#00A1E0",
    priceUsd: 0.9,
    networks: [{ id: "xrp", name: "Ripple", fee: 0.001, feeTicker: "XRP" }],
  },
  {
    id: "xlm",
    name: "Stellar",
    ticker: "XLM",
    icon: <SiStellar className="w-8 h-8 text-gray-500" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#7D00FF",
    priceUsd: 0.15,
    networks: [{ id: "xlm", name: "Stellar", fee: 0.0001, feeTicker: "XLM" }],
  },
  {
    id: "xmr",
    name: "Monero",
    ticker: "XMR",
    icon: <SiMonero className="w-8 h-8 text-orange-600" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#FF6600",
    priceUsd: 180.0,
    networks: [{ id: "xmr", name: "Monero", fee: 0.0001, feeTicker: "XMR" }],
  },
  {
    id: "algo",
    name: "Algorand",
    ticker: "ALGO",
    icon: <SiAlgorand className="w-8 h-8 text-black" />,
    address: "bc1qfrljzvqvk93k0e6k0g2mxaq4gh3534dlxjjluf",
    protocolPrefix: "bitcoin",
    color: "#000000",
    priceUsd: 0.3,
    networks: [{ id: "algo", name: "Algorand", fee: 0.001, feeTicker: "ALGO" }],
  },
].sort((a, b) => a.name.localeCompare(b.name));
