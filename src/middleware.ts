import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export default async function middleware(req: NextRequest) {
  let locale = "en";

  const acceptLanguage = req.headers.get("accept-language") || "en";
  const browserLocale = acceptLanguage.split(",")[0].split("-")[0];

  if (browserLocale === "pt") {
    locale = "pt";
  } else {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (ip !== "unknown") {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        if (data?.countryCode === "BR") {
          locale = "pt";
        }
      } catch (error) {
        console.error("Erro ao buscar geolocalização:", error);
      }
    }
  }

  const url = new URL(req.url);
  if (!url.pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${url.pathname}`, req.url));
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(pt|en)/:path*"],
};
