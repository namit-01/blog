"use client";

import React from "react";
import { Input } from "./ui/input";
import { BookOpen, Search, Tag, Menu } from "lucide-react";
import { blogCategories, useAppData } from "@/context/AppProvider";

const SideBar = () => {
  const {
    searchQuery,
    sidebarOpen,
    setSidebarOpen,
    category,
    setCategory,
    setsearchQuery,
  } = useAppData();

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-gradient-to-b from-slate-50 to-white transition-all duration-300 ${
        sidebarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-4">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-700" />
            <span className="font-semibold text-slate-800">Filters</span>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border p-2 transition hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="h-full overflow-y-auto px-4 py-6">
        {sidebarOpen && (
          <>
            <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">
              Search
            </label>

            <div className="relative mb-8">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <Input
                value={searchQuery}
                onChange={(e) => setsearchQuery(e.target.value)}
                placeholder="Search blogs..."
                className="h-11 rounded-xl border-slate-300 pl-10"
              />
            </div>

            <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">
              Categories
            </label>
          </>
        )}

        <div className="space-y-2">
          {/* All Blogs */}
          <button
            onClick={() => setCategory("")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
              category === "" ? "bg-black text-white" : "hover:bg-slate-100"
            }`}
          >
            <Tag size={18} />
            {sidebarOpen && <span>All Blogs</span>}
          </button>

          {/* Categories */}
          {blogCategories.map((item, index) => (
            <button
              key={index}
              onClick={() => setCategory(item)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
                category === item ? "bg-black text-white" : "hover:bg-slate-100"
              }`}
            >
              <Tag size={18} />
              {sidebarOpen && <span>{item}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
