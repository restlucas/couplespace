"use client";

import { UserContext } from "@/contexts/UserContext";
import { QuestionMark, SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";

export function Header() {
  const { user, makeLogout } = useContext(UserContext);

  return (
    <header className="w-full min-h-[10vh] flex items-center justify-between px-8">
      <Link href="/" className="font-bold text-4xl drop-shadow-xl">
        couplespace
      </Link>

      <div className="flex items-center justify-end gap-2 sm:gap-8">
        <Link
          href="/faq"
          className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
        >
          <QuestionMark size={24} />
        </Link>

        {user && user.id !== "" && (
          <button
            onClick={() => makeLogout()}
            className="w-10 h-10 bg-foreground-light rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
          >
            <SignOut size={24} />
          </button>
        )}
      </div>
    </header>
  );
}
