export type Notification = {
  id: number;
  type: "deposit" | "withdraw" | "transfer";
  status: "Completed" | "Pending";
  currency: "USDT" | "TON";
  amount: number; // positive for deposit, negative for withdraw/transfer

  // New fields from your screenshot
  account: string;
  fees: number;
  chainType: "TON" | "ERC20" | "TRC20";
  time: string;
  address: string;
  txHash: string;
};

// 2. Your new 8 mock notifications with all details
export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "withdraw",
    status: "Completed",
    currency: "USDT",
    amount: -10000.0,
    account: "Funding Account",
    fees: 0.3,
    chainType: "TON",
    time: "2024-05-02 14:30:52",
    address: "UQCcr_jrmrVx8KGNo4oxfmeQuLwgOgu0gQD58UfYcYx1hCSy",
    txHash: "91fbc67b1b26a1dda7475a08fabd05cd22e34fead42f1e5a200cc5ee5d575a7f",
  },
  {
    id: 2,
    type: "transfer",
    status: "Completed",
    currency: "USDT",
    amount: -2000.5,
    account: "Funding Account",
    fees: 0.1,
    chainType: "ERC20",
    time: "2024-05-02 11:15:01",
    address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    txHash: "0x2a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0c",
  },
  {
    id: 3,
    type: "deposit",
    status: "Completed",
    currency: "USDT",
    amount: 25000.0,
    account: "Funding Account",
    fees: 0.0,
    chainType: "TRC20",
    time: "2024-04-28 09:05:22",
    address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    txHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
  },
  {
    id: 4,
    type: "withdraw",
    status: "Completed",
    currency: "USDT",
    amount: -8000.0,
    account: "Funding Account",
    fees: 0.5,
    chainType: "ERC20",
    time: "2024-02-01 23:05:52",
    address: "0x3a4b5c6d7e8f9a0b1a2b3c4d5e6f7a8b9c0d1e2f",
    txHash:
      "0x4a5b6c7d8e9f0a1b2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
  },
  // Add 4 more as you like...
  {
    id: 5,
    type: "withdraw",
    status: "Completed",
    currency: "USDT",
    amount: -6000.0,
    account: "Funding Account",
    fees: 0.3,
    chainType: "TON",
    time: "2024-01-16 18:30:00",
    address: "UQDcr_jrmrVx8KGNo4oxfmeQuLwgOgu0gQD58UfYcYx1hABC",
    txHash: "82abc67b1b26a1dda7475a08fabd05cd22e34fead42f1e5a200cc5ee5d575a7f",
  },
  {
    id: 6,
    type: "deposit",
    status: "Completed",
    currency: "USDT",
    amount: 25000.0,
    account: "Funding Account",
    fees: 0.0,
    chainType: "TRC20",
    time: "2023-10-08 12:00:15",
    address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    txHash: "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
  },
  {
    id: 7,
    type: "transfer",
    status: "Pending",
    currency: "USDT",
    amount: -5000.0,
    account: "Funding Account",
    fees: 0.1,
    chainType: "ERC20",
    time: "2023-08-19 11:00:00",
    address: "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    txHash:
      "0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
  },
  {
    id: 8,
    type: "deposit",
    status: "Completed",
    currency: "USDT",
    amount: 10000.0,
    account: "Funding Account",
    fees: 0.0,
    chainType: "TON",
    time: "2023-03-24 10:45:10",
    address: "UQBer_jrmrVx8KGNo4oxfmeQuLwgOgu0gQD58UfYcYx1hXYZ",
    txHash: "74dbc67b1b26a1dda7475a08fabd05cd22e34fead42f1e5a200cc5ee5d575a7f",
  },
];

// 3. Keep your helper functions here too
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
