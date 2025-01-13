"use client";

import { getPage } from "@/services/couple";
import { signOut, useSession } from "next-auth/react";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
  page: {
    id?: string;
    link?: string;
  };
}

interface UserContextType {
  user: User;
  makeLogout: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    image: "",
    page: {
      id: "",
      link: "",
    },
  });

  const getUser = async (user: User) => {
    const response = await getPage(user.id);

    const { id, link } = response.data;

    setUser({
      ...user,
      page: {
        id,
        link,
      },
    });
  };

  const makeLogout = async () => {
    setUser({
      id: "",
      email: "",
      name: "",
      image: "",
      page: {
        id: "",
        link: "",
      },
    });

    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (session && session.user) {
      getUser(session.user);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, makeLogout }}>
      {children}
    </UserContext.Provider>
  );
}
