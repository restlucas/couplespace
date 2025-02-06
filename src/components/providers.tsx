"use client";

import { UserContextProvider } from "@/contexts/UserContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <UserContextProvider>{children}</UserContextProvider>
    </SessionProvider>
  );
}
