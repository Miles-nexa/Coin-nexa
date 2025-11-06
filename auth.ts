// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { supabaseServer } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// Validate ENV variables
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET from .env.local"
  );
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 1. VALIDATE THAT credentials AND THE PROPERTIES EXIST
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null; // Invalid credentials format
        }

        const { email, password } = credentials;

        // 2. Find user in Supabase
        const { data: user, error } = await supabaseServer
          .from("users")
          .select("id, name, email, password_hash")
          .eq("email", email)
          .single();

        if (error || !user) {
          console.error("Auth error: User not found.", error);
          return null;
        }

        // 3. VALIDATE THE HASH AND PASSWORD TYPE
        // Check that the hash is a non-empty string
        if (typeof user.password_hash !== "string" || !user.password_hash) {
          // This user (e.g., Google user) can't log in with a password
          return null;
        }

        // 4. COMPARE THE STRINGS
        const passwordsMatch = await bcrypt.compare(
          password, // Now TS knows this is a string
          user.password_hash // And knows this is a string
        );

        if (passwordsMatch) {
          // 5. Return user object (id, name, email)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null; // Passwords don't match
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // Keep the 'authorized' callback

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; // token.sub is the 'id' from authorize()
      }
      return session;
    },

    // This callback is triggered when a user logs in (e.g., with Google)
    // We need to check if they exist in our 'users' table.
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email, name } = user;

        if (!email) {
          // Don't allow sign-in if email is missing
          return false;
        }

        // Check if this Google user already exists in our db
        const { data: existingUser } = await supabaseServer
          .from("users")
          .select("id")
          .eq("email", email)
          .single();

        if (!existingUser) {
          // If not, create a new user for them
          const { error } = await supabaseServer
            .from("users")
            .insert({ email: email, name: name }); // password_hash is null

          if (error) {
            console.error("Failed to create Google user:", error);
            return false; // Stop the sign-in
          }
        }
      }
      return true; // Continue the sign-in
    },
  },
});
