"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface IAuth {
  access_token: string;
  refresh_token: string;
}

export interface IAuthContextType {
  auth: IAuth | null;
  createAuth: (data: IAuth) => void;
  removeAuth: () => void;
}
const initAuthState: IAuth | null = null;

export const AuthContext = createContext<IAuthContextType>(
  {} as IAuthContextType
);

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : initAuthState;
  }
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IAuth | null>(getInitialState);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const createAuth = (data: IAuth) => {
    setAuth(() => {
      return data;
    });
  };

  const removeAuth = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, createAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
