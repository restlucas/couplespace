"use client";

import React, { useState } from "react";
import { Feed } from "./feed";
import { Photos } from "./photos";
import { List, Image as Picture } from "@phosphor-icons/react";

// Definindo um enum para as opções
enum LayoutOption {
  Feed = "feed",
  Gallery = "gallery",
}

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function PhotosAndFeed() {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center px-8">
      {/* Layout Mobile */}
      <MobileLayout />

      {/* Layout Desktop */}
      <DesktopLayout>
        <Photos />
        <Feed />
      </DesktopLayout>
    </div>
  );
}

function MobileLayout() {
  const [selectedOption, setSelectedOption] = useState<LayoutOption>(
    LayoutOption.Feed
  );

  const handleOption = (option: LayoutOption) => setSelectedOption(option);

  return (
    <div className="w-full block lg:hidden">
      <div className="flex w-full items-center justify-center rounded-full h-14 mb-8">
        <div className="flex items-center justify-center rounded-full overflow-hidden">
          <Button
            icon={<List size={20} weight="bold" color="#ffffff" />}
            isActive={selectedOption === LayoutOption.Feed}
            onClick={() => handleOption(LayoutOption.Feed)}
            ariaLabel="Feed"
          />
          <Button
            icon={<Picture size={20} weight="bold" color="#ffffff" />}
            isActive={selectedOption === LayoutOption.Gallery}
            onClick={() => handleOption(LayoutOption.Gallery)}
            ariaLabel="Gallery"
          />
        </div>
      </div>

      <div className="w-full">
        {selectedOption === LayoutOption.Feed ? <Feed /> : <Photos />}
      </div>
    </div>
  );
}

function Button({
  icon,
  isActive,
  onClick,
  ariaLabel,
}: {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group px-5 py-3 flex items-center justify-center ${
        isActive ? "bg-foreground" : ""
      }`}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

function DesktopLayout({ children }: BaseLayoutProps) {
  return (
    <div className="hidden lg:w-[980px] xl:w-[1024px] lg:grid grid-cols-[1fr_2fr_1fr] items-start gap-8">
      {children}
    </div>
  );
}
