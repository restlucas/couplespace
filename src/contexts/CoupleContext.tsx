"use client";

import React, { createContext, ReactNode, useState } from "react";

export interface Page {
  id: string;
  link: string;
  publications:
    | {
        id: string;
        message: string;
        createdAt: string;
        user: {
          name: string;
        };
      }[]
    | [];
  pictures: { url: string; name: string }[] | [];
}

interface CoupleContextType {
  content: Page;
  handleContent: (content: Page) => void;
}

interface CoupleContextProviderProps {
  children: ReactNode;
}

export const CoupleContext = createContext({} as CoupleContextType);

export function CoupleContextProvider({
  children,
}: CoupleContextProviderProps) {
  const [content, setContent] = useState<Page>({
    id: "",
    link: "",
    publications: [],
    pictures: [],
  });

  const handleContent = (content: Page) => {
    setContent(content);
  };

  return (
    <CoupleContext.Provider value={{ content, handleContent }}>
      {children}
    </CoupleContext.Provider>
  );
}
