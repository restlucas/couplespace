"use client";

import Image from "next/image";

import { Image as Picture } from "@phosphor-icons/react";
import dateDifference from "@/utils/formatDate";

interface PresentationProps {
  name: string;
  date: string;
  about: string;
  picture: string;
}

export function Presentation({
  data: presentation,
}: {
  data: PresentationProps;
}) {
  return (
    <div className="my-10 mx-8 flex flex-col items-center justify-center">
      <div className="h-44 w-44 rounded-full overflow-hidden relative shadow-lg">
        {presentation.picture ? (
          <Image
            src={presentation.picture}
            alt="Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Picture size={32} />
          </div>
        )}
      </div>

      <span className="text-center text-2xl font-bold my-4 drop-shadow-lg">
        {presentation.name}
      </span>

      <div className="w-full lg:w-[980px] xl:w-[1024px] rounded-xl p-4 sm:p-6 bg-foreground shadow-md">
        <div className="text-center mb-4">
          <h4 className="italic text-sm font-">Contador</h4>
          <span className="text-xl font-bold mb-4">
            {dateDifference(presentation.date)}
          </span>
        </div>

        <div>
          <p className="italic font-bold">Sobre nós</p>
          <span className="text-sm">{presentation.about}</span>
        </div>
      </div>
    </div>
  );
}
