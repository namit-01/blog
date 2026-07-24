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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setsearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState();
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
  const fetchBlogs = async () => {
    try {
      console.log("fetch blog is called");
      const sessionId = localStorage.getItem("sessionId");

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/allblogs?searchQuery=${searchQuery}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [isAuth]);
  useEffect(() => {
    fetchBlogs();
  }, [category, searchQuery]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        setUser,
        setIsAuth,
        sidebarOpen,
        setSidebarOpen,
        setCategory,
        setsearchQuery,
        category,
        searchQuery,
        blogs,
        setBlogs,
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
