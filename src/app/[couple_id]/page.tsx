import { getCoupleDetails } from "@/services/couple";
import { Presentation } from "./presentation";
import { BaseGallery } from "@/contexts/CoupleContext";
import { Content } from "./content";

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
    return <div className="w-hull h-full">Error on fetch page</div>;
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
