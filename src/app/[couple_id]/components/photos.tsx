"use client";

import { Image as Picture } from "@phosphor-icons/react";

import { CoupleContext } from "@/contexts/CoupleContext";
import { useContext, useState } from "react";
import Image from "next/image";

export function Photos() {
  const { content } = useContext(CoupleContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pictures = Array(6)
    .fill(null)
    .map((_, index) => content.pictures[index] || null);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 drop-shadow-lg">Fotos</h3>
      <div className="grid grid-cols-3 grid-rows-2 lg:grid-cols-2 lg:grid-rows-3 gap-4">
        {pictures.map((picture, index) => {
          return picture ? (
            <div
              key={index}
              className="bg-gray-400 rounded-md flex items-center justify-center relative shadow-lg cursor-pointer"
              style={{ aspectRatio: "1" }}
              onClick={() => picture && setSelectedImage(picture.url)}
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
              className="bg-gray-400 rounded-md flex items-center justify-center shadow-lg"
              style={{ aspectRatio: "1" }}
            >
              <Picture size={20} />
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-10 py-5"
          onClick={() => setSelectedImage(null)} // Fechar o modal ao clicar fora
        >
          <div className="relative w-full h-full max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Selected Picture"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
