import { getPageDetails } from "@/services/couple";
import { Presentation } from "./presentation";
import { Content } from "./content";
import Link from "next/link";

type PageParams = {
  params: Promise<{ page_id: string }>;
};

export type PageProps = {
  id: string;
  link: string;
  name: string;
  date: string;
  about: string;
  picture: string;
  publications:
    | {
        id: string;
        message: string;
        createdAt: string;
        user: {
          name: string;
        };
      }[]
    | [];
  pictures: { url: string; name: string }[] | [];
};

export async function generateMetadata({ params }: PageParams) {
  const page_id = (await params).page_id;
  const data = await getPageDetails({
    key: "pageId",
    value: page_id,
  });

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
    description: `Página de ${page.name}`,
  };
}

export default async function CouplePage({ params }: PageParams) {
  const page_id = (await params).page_id;

  const details = await getPageDetails({
    key: "pageId",
    value: page_id,
  });

  if (!details) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center h-[200px] w-[300px] bg-foreground rounded-md p-4">
          <p className="font-bold text-lg">Not Found</p>
          <span>Error on fetch page</span>
          <Link href="/" className="underline text-sm">
            Get back
          </Link>
        </div>
      </div>
    );
  }

  const { name, date, picture, about, ...content } = details as PageProps;

  const presentation = {
    name,
    date,
    picture,
    about,
  };

  return (
    <div className="mb-12">
      <Presentation data={presentation} />
      <Content data={content} />
    </div>
  );
}
