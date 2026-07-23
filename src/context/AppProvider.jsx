"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const blogCategories = [
  "Techonlogy",
  "Health",
  "Finance",
  "Travel",
  "Education",
  "Entertainment",
  "Study",
];
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/me`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );

      setUser(data);
      setIsAuth(true);

      console.log(data);
    } catch (err) {
      console.log(err);
      setUser(null);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        setUser,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAppData must be used within AuthProvider");
  }

  return context;
};

export default AuthProvider;
