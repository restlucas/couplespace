import { CoupleContextProvider } from "@/contexts/CoupleContext";

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
