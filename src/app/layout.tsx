import { Bree_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const bree_serif = Bree_Serif({
  variable: "--font-bree-serif-sans",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bree_serif.variable} text-white antialiased bg-gradient-to-r from-rose to-blue-clean flex h-screen w-screen flex-col overflow-x-hidden `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
