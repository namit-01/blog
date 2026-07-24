"use client";

import React, { useRef } from "react";
import { useAppData } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import { Camera, Crown, LogOut, Pencil, User, User2 } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import axios from "axios";

const Page = () => {
  const { user, setIsAuth, setUser } = useAppData();
  const router = useRouter();
  const fileRef = useRef(null);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleLogOut = () => {
    localStorage.removeItem("sessionId");
    setUser(null);
    setIsAuth(false);
    router.push("/");
  };
  const handleChangeProfile = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const sessionId = localStorage.getItem("sessionId");

      const formData = new FormData();
      formData.append("image", file); // "image" backend ke multer field name ke according

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/user/update/pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(data);
      setUser(data);
      // Agar backend updated user bhejta hai
      // setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.image}
              alt={user.name}
              className="h-24 w-24 rounded-full border object-cover"
              onLoad={() => console.log("Loaded")}
              onError={(e) => {
                console.log("Image failed");
                console.log(e);
              }}
            />

            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-md transition hover:bg-blue-700"
            >
              <Camera size={16} />
            </button>

            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              className="hidden"
              onChange={handleChangeProfile}
            />
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h1>

          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        {/* Bio */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>

            <button
              onClick={() => router.push("/profile/edit")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            {user.bio?.trim() ? (
              user.bio
            ) : (
              <span className="italic text-gray-400">
                No bio added yet. Tell people a little about yourself.
              </span>
            )}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium">{user.userId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium break-all">{user.email}</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center gap-5 text-2xl">
          <a
            href={user.instagram || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-pink-600 hover:opacity-70"
          >
            <FaInstagram />
          </a>

          <a
            href={user.facebook || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:opacity-70"
          >
            <FaFacebook />
          </a>

          <a
            href={user.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 hover:opacity-70"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.push("/profile/edit")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-600 py-2 text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => router.push("/blog/new")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-2 text-white transition hover:bg-gray-800"
          >
            <Crown size={18} />
            Blog
          </button>
          <button
            onClick={handleLogOut}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
