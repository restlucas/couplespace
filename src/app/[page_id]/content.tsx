"use client";

import React, { useContext, useEffect, useState } from "react";
import { Feed } from "./components/feed";
import { Photos } from "./components/photos";
import { List, Image as Picture } from "@phosphor-icons/react";
import { PageContext, Page } from "@/contexts/PageContext";

interface LayoutProps {
  children: React.ReactNode;
}

type DesktopLayoutProps = LayoutProps;

export function Content({ data }: { data: Page }) {
  const { handleContent } = useContext(PageContext);

  useEffect(() => {
    handleContent(data);
  }, [handleContent, data]);

  return (
    <div className="space-y-8 flex flex-col items-center justify-center px-8">
      <>
        {/* Layout Mobile */}
        <MobileLayout />

        {/* Layout Desktop */}
        <DesktopLayout>
          <Photos />
          <Feed />
          {/* <Songs /> */}
        </DesktopLayout>
      </>
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
          {/* <Songs /> */}
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
        <div className="flex items-center justify-center rounded-full overflow-hidden">
          <button
            type="button"
            id="feed"
            onClick={() => handleOption("feed")}
            className={`group px-5 py-3 flex items-center justify-center  ${
              selectedOption === "feed" ? "bg-foreground" : ""
            }`}
          >
            <List size={20} weight="bold" color="#ffffff" />
          </button>
          <button
            type="button"
            id="gallery"
            onClick={() => handleOption("gallery")}
            className={`group px-5 py-3 flex items-center justify-center ${
              selectedOption === "gallery" ? "bg-foreground" : ""
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
