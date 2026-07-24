"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppProvider";
import { Filter } from "lucide-react";
import React from "react";
import { VscLoading } from "react-icons/vsc";

const fakeBlogs = [
  {
    id: 1,
    image: "https://picsum.photos/500/300?random=1",
    title: "Exploring the Beauty of Nature",
    description:
      "Discover how spending time in nature can refresh your mind and improve your lifestyle.",
    created_at: "2026-07-24",
  },
  {
    id: 2,
    image: "https://picsum.photos/500/300?random=2",
    title: "The Future of Artificial Intelligence",
    description:
      "AI is changing the way we work, learn, and interact with technology.",
    created_at: "2026-07-23",
  },
  {
    id: 3,
    image: "https://picsum.photos/500/300?random=3",
    title: "A Guide to Better Productivity",
    description:
      "Simple habits that can help you manage time and achieve your goals.",
    created_at: "2026-07-22",
  },
  {
    id: 4,
    image: "https://picsum.photos/500/300?random=4",
    title: "Why Reading Blogs Matters",
    description:
      "Learn how reading useful content can increase your knowledge every day.",
    created_at: "2026-07-21",
  },
];

const Blogs = () => {
  const { blogs, searchQuery, category } = useAppData();
  console.log(searchQuery);
  console.log(category);
  return (
    <div className="container mx-auto px-4">
      <div className="my-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>

        <Button className="flex items-center gap-2">
          <Filter size={18} />
          <span>Filter Blogs</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!blogs && (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
            <VscLoading className="h-14 w-14 animate-spin text-slate-800" />
            <p className="text-lg font-medium text-slate-600">
              Loading blogs...
            </p>
          </div>
        )}
        {blogs?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16">
            <h2 className="text-2xl font-bold text-slate-800">
              No Blogs Found
            </h2>
            <p className="mt-2 max-w-md text-center text-slate-500">
              We couldn't find any blogs matching your search or selected
              category. Try changing the filters or search for something else.
            </p>
          </div>
        )}
        {blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            title={blog.title}
            desc={blog.description}
            id={blog.id}
            time={blog.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
