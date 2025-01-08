"use client";

import { CoupleContext } from "@/contexts/CoupleContext";
import { MusicNote } from "@phosphor-icons/react";
import { useContext } from "react";

export function Songs() {
  const { content } = useContext(CoupleContext);

  const songs = Array(6)
    .fill(null)
    .map((_, index) => content.pictures[index] || null);

  return (
    <div>
      <h3 className="text-2xl font-semibold text-pink-normal mb-6">Músicas</h3>
      <div className="grid grid-cols-3 grid-rows-2 lg:grid-cols-2 lg:grid-rows-3 gap-4">
        {songs.map((song, index) => {
          return song ? (
            <div
              key={index}
              className="bg-gray-400 rounded-md flex items-center justify-center relative"
              style={{ aspectRatio: "1" }}
            >
              song
            </div>
          ) : (
            <div
              key={index}
              className="bg-gray-400 rounded-md flex items-center justify-center"
              style={{ aspectRatio: "1" }}
            >
              <MusicNote size={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
