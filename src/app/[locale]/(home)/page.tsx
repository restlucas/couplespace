"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Home() {
  const { data: session } = useSession();
  const t = useTranslations("Home");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Hero content */}
      <section className="h-[350px] flex items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-center drop-shadow-lg">
          {t("title")}
        </h1>
        <p className="text-xl mb-8 text-center drop-shadow-lg">
          {t("paragraph")}
        </p>

        <Link
          href={session && session.user ? `/dashboard` : `/login`}
          className="px-4 py-3 rounded-md font-bold shadow-lg bg-foreground duration-100 hover:bg-foreground-light"
        >
          {session && session.user ? t("button.dashboard") : t("button.login")}
        </Link>
      </section>

      {/* How does it works? */}
      {/* Make login */}
      {/* FAQ */}
    </div>
  );
}
