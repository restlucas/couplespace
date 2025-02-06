import { PageNavigation } from "@/components/pageNavigation";
import { PageContextProvider } from "@/contexts/PageContext";
import { getPageDetails } from "@/services/couple";

type PageParams = {
  params: Promise<{ locale?: string; page_id: string; slug: string }>;
};

export async function generateMetadata({ params }: PageParams) {
  const { page_id, slug } = await params;

  const data = await getPageDetails(
    page_id.split("-").pop() as string,
    slug as string
  );

  const page = {
    name: "...",
    description: "...",
  };

  if (data && data.name) {
    page.name = data.name;
    page.description = data.description;
  }

  return {
    title: `Couplesace | Página de ${page.name}`,
    description: `Página de ${page.description}`,
  };
}

export default async function PageIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string; page_id: string; slug: string }>;
}) {
  const { page_id, slug } = await params;

  return (
    <main className="w-full">
      <PageContextProvider params={{ page_id, slug }}>
        <PageNavigation />
        {children}
      </PageContextProvider>
    </main>
  );
}
