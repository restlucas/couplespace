"use client";

import Image from "next/image";

import { Image as Picture } from "@phosphor-icons/react";

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
    <div className="mt-[12vh] mb-6 mx-8 flex flex-col items-center justify-center">
      <div className="h-44 w-44 rounded-full overflow-hidden bg-pink-normal absolute inset-1/2 transform -translate-x-1/2 top-[10vh]">
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

      <span className="text-center text-2xl font-bold my-4">
        {presentation.name}
      </span>

      <div className="w-full lg:w-[980px] xl:w-[1024px] rounded-xl p-4 sm:p-6 bg-pink-neutral border-pink-normal border-2 shadow-md">
        <div className="text-center mb-4">
          <h4 className="italic text-sm text-pink-normal">Contador</h4>
          <span className="text-xl font-semibold mb-4 text-pink-normal">
            1 ano, 2 meses e 3 dias
          </span>
        </div>

        <div>
          <p className="italic font-semibold text-pink-normal">Sobre nós</p>
          <span className="text-sm">{presentation.about}</span>
        </div>
      </div>
    </div>
  );
}
