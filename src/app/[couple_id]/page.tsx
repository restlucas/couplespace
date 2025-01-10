import { getCoupleDetails } from "@/services/couple";
import { Presentation } from "./presentation";
import { BaseGallery } from "@/contexts/CoupleContext";
import { Content } from "./content";

export interface CouplePageProps {
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
}

export default async function CouplePage({
  params,
}: {
  params: { couple_id: string };
}) {
  const coupleId = params.couple_id;

  const details = await getCoupleDetails({
    key: "coupleId",
    value: coupleId,
  });

  if (!details) {
    throw new Error("Couple details not found");
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
