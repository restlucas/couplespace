"use client";

import { CoupleContext } from "@/contexts/CoupleContext";
import { useContext } from "react";

export function Feed() {
  const { content } = useContext(CoupleContext);

  return (
    <div className="animate-fade-right">
      <div className="w-full flex items-center justify-start mb-6">
        <h3 className="text-2xl font-semibold text-pink-normal">Feed</h3>
      </div>
      <div className="flex flex-col gap-8">
        {content.publications.length > 0 ? (
          content.publications.map((publication) => {
            return (
              <div
                key={publication.id}
                className="rounded-xl p-4 sm:p-6 bg-pink-neutral border-pink-normal border-2 shadow-lg"
              >
                <div className="flex items-center justify-start mb-2">
                  <span className="text-xs italic font-semibold text-pink-normal">
                    {publication.createdAt}
                  </span>
                </div>
                <div className="">{publication.message}</div>
              </div>
            );
          })
        ) : (
          <div className="border-2 rounded-md border-dashed p-4 sm:p-6 flex flex-col items-center justify-center gap-2">
            <span>Nenhuma publicação até o momento 😪</span>
            <span className="text-sm">Faça a primeira</span>
          </div>
        )}
      </div>
    </div>
  );
}
