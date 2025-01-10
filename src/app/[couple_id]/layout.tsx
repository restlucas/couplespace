import { CoupleContextProvider } from "@/contexts/CoupleContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couplespace | Minha página",
  description: "Guarde seu amor",
};

export default function CoupleIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <CoupleContextProvider>{children}</CoupleContextProvider>
    </main>
  );
}
