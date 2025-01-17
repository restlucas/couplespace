import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Couplespace",
  description: "Guarde seu amor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense>
        <main className="mx-8 flex-1">{children}</main>
      </Suspense>
      <Footer />
    </>
  );
}
