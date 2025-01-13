"use client";

import { UserContext } from "@/contexts/UserContext";
import { SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";

export function Header() {
  const { user, makeLogout } = useContext(UserContext);

  return (
    <header className="w-full min-h-[10vh] flex items-center justify-between px-8">
      <Link href="/" className="font-bold text-4xl drop-shadow-xl">
        couplespace
      </Link>

      {user && user.id !== "" && (
        <button
          onClick={() => makeLogout()}
          className="w-10 h-10 bg-foreground-light rounded-full flex items-center justify-center"
        >
          <SignOut size={24} />
        </button>
      )}
    </header>
  );
}
