"use client";

import { getPageDetails, getPagePublications } from "@/services/couple";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ParamsProps {
  page_id: string;
  slug: string;
}

interface Publication {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface Page {
  id: string;
  link: string;
  pictures: { url: string; name: string }[] | [];
}

interface PageContextType {
  content: Page | undefined;
  publications: Publication[] | [];
  loading: boolean;
  fetchContent: () => void;
  fetchPublications: () => void;
}

interface PageContextProviderProps {
  children: ReactNode;
  params: ParamsProps;
}

export const PageContext = createContext({} as PageContextType);

export function PageContextProvider({
  children,
  params,
}: PageContextProviderProps) {
  const [pageParams] = useState(params);
  const [content, setContent] = useState<Page | undefined>();
  const [publications, setPublications] = useState<Publication[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    const response = await getPageDetails(pageParams.page_id, pageParams.slug);
    setContent(response);
  };

  const fetchPublications = async () => {
    const response = await getPagePublications(
      pageParams.page_id,
      pageParams.slug
    );
    setPublications(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
    fetchPublications();
  }, []);

  return (
    <PageContext.Provider
      value={{
        content,
        publications,
        loading,
        fetchContent,
        fetchPublications,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
