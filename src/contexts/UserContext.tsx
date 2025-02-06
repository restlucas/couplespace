"use client";

import { signOut, useSession } from "next-auth/react";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
  pageLink: string;
}

interface UserContextType {
  user: User;
  loading: boolean;
  makeLogout: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    image: "",
    pageLink: "",
  });

  const makeLogout = async () => {
    setUser({
      id: "",
      email: "",
      name: "",
      image: "",
      pageLink: "",
    });
    localStorage.removeItem("user");

    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (session && session.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
      setUser(session.user);
    }

    setLoading(false);
  }, [session]);

  // useEffect(() => {
  //   if (session && session.user) {
  //     localStorage.setItem("user", JSON.stringify(session.user));
  //     getUser(session.user);
  //   }
  // }, [session]);

  return (
    <UserContext.Provider value={{ user, loading, makeLogout }}>
      {children}
    </UserContext.Provider>
  );
}
