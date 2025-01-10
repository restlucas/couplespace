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

  const { name, date, picture, about, ...content } = (await getCoupleDetails({
    key: "coupleId",
    value: coupleId,
  })) as CouplePageProps;

  const presentation = {
    name: name,
    date: date,
    picture: picture,
    about: about,
  };

  return (
    <div className="mb-12">
      <Presentation data={presentation} />
      <Content data={content} />
    </div>
  );
}
