"use client";

import { CoupleContext } from "@/contexts/CoupleContext";
import { usePublication } from "@/contexts/PublicationContext";
import { Plus } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export function Feed() {
  const { togglePublicationView } = usePublication();
  const { content } = useContext(CoupleContext);
  const { data: session } = useSession();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (session && session.user) {
      setIsLogged(true);
    }
  }, [session]);

  console.log(content.publications);

  return (
    <div className="animate-fade-right">
      <div className="w-full flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-pink-normal">Feed</h3>

        {isLogged && (
          <button
            onClick={togglePublicationView}
            className="py-2 px-3 rounded-md bg-pink-neutral text-pink-normal font-semibold flex items-center justify-center gap-2"
          >
            <span className="text-xs">Nova publicação</span>
            <Plus size={18} weight="bold" />
          </button>
        )}
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
                  {/* <span className="text-sm font-bold text-pink-normal italic">
                      por Lucas
                    </span> */}
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
