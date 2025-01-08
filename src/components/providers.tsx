"use client";

import { PublicationProvider } from "@/contexts/PublicationContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PublicationProvider>{children}</PublicationProvider>
    </SessionProvider>
  );
}
