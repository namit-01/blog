"use client";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useAppData } from "@/context/AppProvider";
const Page = () => {
  const [open, setOpen] = useState(false);
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const { user, isAuth } = useAppData();

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
        image: decoded.picture,
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/login`,
        userData,
      );
      console.log(data);
      localStorage.setItem("sessionId", data.sessionId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      hi
      <p>{user?.name}</p>
      {open && (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Login Failed")}
        ></GoogleLogin>
      )}
    </div>
  );
};

export default Page;
