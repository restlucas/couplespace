"use client";

import React, { useContext, useEffect, useState } from "react";
import { Feed } from "./components/feed";
import { Photos } from "./components/photos";
import { Songs } from "./components/songs";
import { usePublication } from "@/contexts/PublicationContext";
import { ArrowLeft, List, Image as Picture } from "@phosphor-icons/react";
import { CoupleContext, Page } from "@/contexts/CoupleContext";

interface LayoutProps {
  children: React.ReactNode;
}

type DesktopLayoutProps = LayoutProps;

export function Content({ data }: { data: Page }) {
  const { isCreatingPublication } = usePublication();

  const { handleContent } = useContext(CoupleContext);

  useEffect(() => {
    handleContent(data);
  }, []);

  return (
    <div className="space-y-8 flex flex-col items-center justify-center px-8">
      {isCreatingPublication ? (
        <NewPublication />
      ) : (
        <>
          {/* Layout Mobile */}
          <MobileLayout />

          {/* Layout Desktop */}
          <DesktopLayout>
            <Photos />
            <Feed />
            <Songs />
          </DesktopLayout>
        </>
      )}
    </div>
  );
}

function MobileLayout() {
  const [selectedOption, setSelectedOption] = useState<"feed" | "gallery">(
    "feed"
  );

  const options: Record<"feed" | "gallery", React.ReactNode> = {
    feed: <Feed />,
    gallery: (
      <div className="animate-fade-right">
        <div className="space-y-8">
          <Photos />
          <Songs />
        </div>
      </div>
    ),
  };

  const handleOption = (option: "feed" | "gallery") => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full block lg:hidden">
      <div className="flex w-full items-center justify-center rounded-full h-14 mb-8">
        <div className="flex items-center justify-center rounded-full border overflow-hidden">
          <button
            type="button"
            id="feed"
            onClick={() => handleOption("feed")}
            className={`group px-5 py-3 flex items-center justify-center  ${
              selectedOption === "feed" ? "bg-pink-normal" : "bg-[#243151]"
            }`}
          >
            <List size={20} weight="bold" color="#ffffff" />
          </button>
          <button
            type="button"
            id="gallery"
            onClick={() => handleOption("gallery")}
            className={`group px-5 py-3 flex items-center justify-center ${
              selectedOption === "gallery" ? "bg-pink-normal" : "bg-[#243151]"
            }`}
          >
            <Picture size={20} weight="bold" color="#ffffff" />
          </button>
        </div>
      </div>

      <div className="w-full">{options[selectedOption]}</div>
    </div>
  );
}

function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="hidden lg:w-[980px] xl:w-[1024px] lg:grid grid-cols-[1fr_2fr_1fr] items-start gap-8">
      {children}
    </div>
  );
}

function NewPublication() {
  const [message, setMessage] = useState<string | "">("");
  const { togglePublicationView } = usePublication();

  return (
    <div className="animate-fade-right w-full lg:w-[980px] xl:w-[1024px] mt-6">
      <div className="w-full flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-pink-normal">
          Nova publicação
        </h3>
        <button
          onClick={togglePublicationView}
          className="py-2 px-3 rounded-md bg-pink-normal text-pink-neutral font-semibold flex items-center justify-center gap-2"
        >
          <span className="text-xs">Voltar</span>
          <ArrowLeft size={18} weight="bold" />
        </button>
      </div>

      <div className="rounded-xl p-6 bg-pink-neutral border-pink-normal border-2 shadow-md space-y-8">
        <h3 className="font-semibold text-pink-normal">Mensagem</h3>

        <textarea
          name="message"
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md bg-[#f7f7f7] p-2 resize-none"
        />

        <div className="flex items-center justify-end">
          <button className="bg-pink-normal text-pink-neutral font-bold py-3 px-5 rounded-md">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
