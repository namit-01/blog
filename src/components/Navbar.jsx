"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, User, X } from "lucide-react";
import { useAppData } from "@/context/AppProvider";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuth } = useAppData();
  return (
    <div className="bg-white shadow-md p-4 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-xl font-bold text-gray-900">
          The Reading Retreat
        </Link>
        <div className="md:hidden">
          <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6"></X>
            ) : (
              <Menu className="w-6 h-6"></Menu>
            )}
          </Button>
        </div>
        <ul className="hidden md:flex justify-center items-center space-x-6 text-gray-700">
          <li>
            <Link href={"/"} className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/blog/saved"} className="hover:text-blue-500">
              Saved Blogs
            </Link>
          </li>
          <li>
            {isAuth ? (
              <>
                <Link href={"/profile"} className="hover:text-blue-500">
                  <User className="text-blue-500"></User>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link href={"/login"} className="hover:text-blue-500">
                  <LogIn></LogIn>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col justify-center items-center space-y-4 p-4 text-gray-700 bg-white shadow-md">
          <li>
            <Link href={"/"} className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/blog/saved"} className="hover:text-blue-500">
              Saved Blogs
            </Link>
          </li>
          <li>
            {isAuth ? (
              <>
                <Link href={"/profile"} className="hover:text-blue-500">
                  <User className="text-blue-500"></User>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link href={"/login"} className="hover:text-blue-500">
                  <LogIn></LogIn>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
