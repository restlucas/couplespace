/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      role?: string;
    } & DefaultSession["user"];
  }
}
