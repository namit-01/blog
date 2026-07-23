"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useAppData } from "@/context/AppProvider";
const Page = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setIsAuth } = useAppData();
  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
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
      setLoading(false);
      router.replace("/");
      setOpen(false);
      console.log(data);
      localStorage.setItem("sessionId", data.sessionId);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="w-[350px] m-auto mt-[200px]">
      <Card className="w-full bg-black border-zinc-800 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Login to your account</CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in with your Google account
          </CardDescription>
        </CardHeader>

        <CardContent />

        <CardFooter className="flex-col gap-2">
          <GoogleLogin
            theme="filled_black"
            size="large"
            shape="rectangular"
            text="signin_with"
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
