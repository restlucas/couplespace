"use client";

import { Image as Picture } from "@phosphor-icons/react";

import { CoupleContext } from "@/contexts/CoupleContext";
import { useContext } from "react";
import Image from "next/image";

export function Photos() {
  const { content } = useContext(CoupleContext);

  const pictures = Array(6)
    .fill(null)
    .map((_, index) => content.pictures[index] || null);

  return (
    <div>
      <h3 className="text-2xl font-semibold text-pink-normal mb-6">Fotos</h3>
      <div className="grid grid-cols-3 grid-rows-2 lg:grid-cols-2 lg:grid-rows-3 gap-4">
        {pictures.map((picture, index) => {
          return picture ? (
            <div
              key={index}
              className="bg-gray-400 rounded-md flex items-center justify-center relative"
              style={{ aspectRatio: "1" }}
            >
              <Image
                src={picture.url}
                alt="Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <div
              key={index}
              className="bg-gray-400 rounded-md flex items-center justify-center"
              style={{ aspectRatio: "1" }}
            >
              <Picture size={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
