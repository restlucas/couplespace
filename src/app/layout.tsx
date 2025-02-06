import { Bree_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const bree_serif = Bree_Serif({
  variable: "--font-bree-serif-sans",
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${bree_serif.variable} text-white antialiased bg-gradient-to-r from-rose to-blue-clean flex h-screen w-screen flex-col overflow-x-hidden `}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
