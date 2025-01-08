import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-8 flex-1">{children}</main>
      <Footer />
    </>
  );
}
