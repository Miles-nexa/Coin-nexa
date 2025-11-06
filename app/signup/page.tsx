// app/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Something went wrong.");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        setError("Login failed after sign up. Please try logging in manually.");
        router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    // Page background
    <main className="h-screen flex items-center justify-center bg-gray-900">
      {/* Card background */}
      <div className="w-[90%] max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-md">
        <div className="text-center">
          {/* Text colors */}
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="mt-2 text-sm text-gray-300">
            Enter your details to get started.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleCredentialsSignUp}>
          {error && (
            // Error colors
            <div className="p-3 text-center text-sm text-red-200 bg-red-900 rounded-lg">
              {error}
            </div>
          )}

          <div>
            {/* Label colors */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            {/* Input colors */}
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            {/* Label colors */}
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            {/* Input colors */}
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              placeholder="Create a password"
            />
          </div>

          {/* Signup button colors */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>

        {/* Google button colors */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>

        {/* Login link colors */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
