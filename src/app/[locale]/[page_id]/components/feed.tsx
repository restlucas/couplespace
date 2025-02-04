"use client";

import { PageContext } from "@/contexts/PageContext";
import { timeSinceRecord } from "@/utils/formatDate";
import { useLocale, useTranslations } from "next-intl";
import { useContext } from "react";

export function Feed() {
  const { content } = useContext(PageContext);
  const locale = useLocale();
  const t = useTranslations("Page");

  return (
    <div className="animate-fade-right">
      <div className="w-full flex items-center justify-start mb-6">
        <h3 className="text-2xl font-bold drop-shadow-lg">{t("feed")}</h3>
      </div>
      <div className="flex flex-col gap-8">
        {content.publications.length > 0 ? (
          content.publications.map((publication) => {
            return (
              <div
                key={publication.id}
                className="rounded-xl p-4 sm:p-6 bg-foreground shadow-lg"
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="text-sm italic">
                    <span>{t("by")} </span>
                    <span className="font-bold">
                      {publication.user.name.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-xs italic font-semibold">
                    {timeSinceRecord(publication.createdAt, locale)}
                  </span>
                </div>
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: publication.message }}
                />
              </div>
            );
          })
        ) : (
          <div className="border-2 rounded-md border-dashed p-4 sm:p-6 flex flex-col items-center justify-center gap-2">
            <span className="drop-shadow-lg">{t("noPublications")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
