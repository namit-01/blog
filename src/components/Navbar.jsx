"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, User, X } from "lucide-react";
import { useAppData } from "@/context/AppProvider";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useAppData();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          The Reading Retreat
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/blogs/saved"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Saved Blogs
          </Link>

          {isAuth ? (
            <Link
              href="/profile"
              className="rounded-full p-2 transition hover:bg-slate-100"
            >
              <User className="h-5 w-5 text-blue-600" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full p-2 transition hover:bg-slate-100"
            >
              <LogIn className="h-5 w-5 text-slate-700" />
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="border-t border-slate-200 bg-white">
          <ul className="flex flex-col py-2">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/blogs/saved"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                Saved Blogs
              </Link>
            </li>

            <li>
              {isAuth ? (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
