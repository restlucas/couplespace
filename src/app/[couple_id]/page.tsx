import { getCoupleDetails } from "@/services/couple";
import { Presentation } from "./presentation";
import { BaseGallery } from "@/contexts/CoupleContext";
import { Content } from "./content";
import Link from "next/link";

type PageProps = {
  params: Promise<{ couple_id: string }>;
};

export type CouplePageProps = {
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
      }[]
    | [];
  songs: BaseGallery[] | [];
  pictures: BaseGallery[] | [];
};

export default async function CouplePage({ params }: PageProps) {
  const couple_id = (await params).couple_id;

  const details = await getCoupleDetails({
    key: "coupleId",
    value: couple_id,
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

  const { name, date, picture, about, ...content } = details as CouplePageProps;

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
