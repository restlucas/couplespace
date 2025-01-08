import React, { createContext, useContext, useState } from "react";

interface PublicationContextProps {
  isCreatingPublication: boolean;
  togglePublicationView: () => void;
}

const PublicationContext = createContext<PublicationContextProps | undefined>(
  undefined
);

export const PublicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCreatingPublication, setIsCreatingPublication] = useState(false);

  const togglePublicationView = () => {
    setIsCreatingPublication((prev) => !prev);
  };

  return (
    <PublicationContext.Provider
      value={{ isCreatingPublication, togglePublicationView }}
    >
      {children}
    </PublicationContext.Provider>
  );
};

export const usePublication = () => {
  const context = useContext(PublicationContext);
  if (!context) {
    throw new Error("usePublication must be used within a PublicationProvider");
  }
  return context;
};
