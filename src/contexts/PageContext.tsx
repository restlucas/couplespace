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

interface PageContextType {
  content: Page;
  handleContent: (content: Page) => void;
}

interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContext = createContext({} as PageContextType);

export function PageContextProvider({ children }: PageContextProviderProps) {
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
    <PageContext.Provider value={{ content, handleContent }}>
      {children}
    </PageContext.Provider>
  );
}
