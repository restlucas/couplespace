"use client";

import { Link } from "@/i18n/routing";
import { useContext } from "react";
import { PageContext } from "@/contexts/PageContext";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import dateDifference from "@/utils/formatDate";
import { PictureInPicture } from "@phosphor-icons/react";
import { PhotosAndFeed } from "./components/photosAndFeed";
import { Skeleton } from "./components/skeleton";

type ContentProps = {
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

export default function CouplePage() {
  const locale = useLocale();
  const t = useTranslations("Page");
  const { content, loading } = useContext(PageContext);
  const page = content as ContentProps;

  if (loading) {
    return <Skeleton />;
  }

  if (!content) {
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

  return (
    <div className="mb-12">
      {/* Main photo, start date and about us */}
      <div className="my-10 mx-8 flex flex-col items-center justify-center">
        <div className="h-44 w-44 rounded-full overflow-hidden relative shadow-lg">
          {page.picture ? (
            <Image
              src={page.picture}
              alt="Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PictureInPicture size={32} />
            </div>
          )}
        </div>

        <span className="text-center text-2xl font-bold my-4 drop-shadow-lg">
          {page.name}
        </span>

        <div className="w-full lg:w-[980px] xl:w-[1024px] rounded-xl p-4 sm:p-6 bg-foreground shadow-md">
          <div className="text-center mb-4">
            <h4 className="italic text-sm font-">{t("count")}</h4>
            <span className="text-xl font-bold mb-4">
              {dateDifference(page.date, locale)}
            </span>
          </div>

          <div>
            <p className="italic font-bold">{t("about")}</p>
            <span className="text-sm">{page.about}</span>
          </div>
        </div>
      </div>

      {/* Photos and feed */}
      <PhotosAndFeed />
    </div>
  );
}
