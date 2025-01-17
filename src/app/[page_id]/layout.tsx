import { PageContextProvider } from "@/contexts/PageContext";

export default function PageIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <PageContextProvider>{children}</PageContextProvider>
    </main>
  );
}
