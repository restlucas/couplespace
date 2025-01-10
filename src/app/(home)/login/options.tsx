"use client";

import { GoogleLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";

export function LoginOptions() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* <button
        onClick={() => signIn("facebook")}
        className="py-2 rounded-md bg-facebook flex items-center justify-center gap-2 duration-100 hover:bg-facebook/50"
      >
        <FacebookLogo size={20} weight="bold" />
        <span className="font-bold">Facebook</span>
      </button> */}
      <button
        onClick={() => signIn("google")}
        className="py-2 rounded-md bg-google flex items-center justify-center gap-2 duration-100 hover:bg-google/50"
      >
        <GoogleLogo size={20} weight="bold" />
        <span className="font-bold">Google</span>
      </button>
    </div>
  );
}
