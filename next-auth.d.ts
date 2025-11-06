// next-auth.d.ts
import { DefaultSession } from "next-auth";

// This tells TypeScript to merge this new type with the original module
declare module "next-auth" {
  /**
   * We're extending the built-in 'Session' type
   */
  interface Session {
    user: {
      /** The user's unique ID from your database */
      id: string;
    } & DefaultSession["user"]; // This keeps the original properties (name, email, image)
  }
}
