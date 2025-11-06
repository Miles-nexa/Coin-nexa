// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseServer } from "@/lib/supabase"; // <-- Import Supabase client

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    // Check if user already exists
    const { data: existingUser, error: findError } = await supabaseServer
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user in the 'users' table
    const { data: newUser, error: createError } = await supabaseServer
      .from("users")
      .insert({
        email: email,
        password_hash: hashedPassword,
        name: email.split("@")[0], // Default name
      })
      .select("id") // Get the new user's ID back
      .single();

    if (createError || !newUser) {
      throw new Error(createError?.message || "Failed to create user");
    }

    // --- THIS IS THE NEW PART ---
    // When a new user signs up, create their empty wallets
    const defaultWallets = [
      {
        user_id: newUser.id,
        coin_ticker: "BTC",
        funding_balance: 0,
        trading_balance: 0,
      },
      {
        user_id: newUser.id,
        coin_ticker: "ETH",
        funding_balance: 0,
        trading_balance: 0,
      },
      {
        user_id: newUser.id,
        coin_ticker: "USDT",
        funding_balance: 0,
        trading_balance: 0,
      },
    ];

    const { error: walletError } = await supabaseServer
      .from("wallets")
      .insert(defaultWallets);

    if (walletError) {
      console.error("Failed to create default wallets:", walletError);
      // We don't fail the whole signup, but we log the error
    }

    return NextResponse.json({ user: { email: email } }, { status: 201 });
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
