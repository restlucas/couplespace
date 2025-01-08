"use client";

import { FacebookLogo, GoogleLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";

export function LoginOptions() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={() => signIn("facebook")}
        className="py-2 rounded-md bg-facebook flex items-center justify-center gap-2"
      >
        <FacebookLogo size={20} weight="bold" />
        <span>Facebook</span>
      </button>
      <button
        onClick={() => signIn("google")}
        className="py-2 rounded-md bg-google flex items-center justify-center gap-2"
      >
        <GoogleLogo size={20} weight="bold" />
        <span>Google</span>
      </button>
    </div>
  );
}
