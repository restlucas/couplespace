"use client";

import { Link } from "@/i18n/routing";
import { House, SignIn, SignOut } from "@phosphor-icons/react";
import { signIn, signOut, useSession } from "next-auth/react";

export function PageNavigation() {
  const session = useSession();

  const handleLogin = () => {
    const callbackUrl = window.location.href;
    signIn("google", {
      redirect: false,
      callbackUrl: callbackUrl,
    }).then((response) => {
      if (response?.ok) {
        window.location.href = callbackUrl;
      } else {
        console.log("Error on login");
      }
    });
  };

  const handleLogout = async () => {
    const currentUrl = window.location.href;
    localStorage.removeItem("user");
    await signOut({ redirect: false });
    window.location.href = currentUrl;
  };

  return (
    <header className="w-full min-h-[10vh] flex items-center justify-end px-8">
      <div className="flex items-center justify-end gap-2 sm:gap-8">
        {session.status === "loading" ? (
          <div className="animate-pulse w-10 h-10 bg-foreground rounded-full" />
        ) : session.data?.user ? (
          <>
            <Link
              href="/dashboard"
              className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
            >
              <House size={24} />
            </Link>
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
            >
              <SignOut size={24} />
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
          >
            <SignIn size={20} weight="bold" />
          </button>
        )}

        {/* {user && user.id !== "" && (
          <button
            onClick={() => makeLogout()}
            className="w-10 h-10 bg-foreground-light rounded-full flex items-center justify-center duration-100 hover:bg-foreground-light"
          >
            <SignOut size={24} />
          </button>
        )} */}
      </div>
    </header>
  );
}
