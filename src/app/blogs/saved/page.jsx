import BlogCard from "@/components/BlogCard";
import React, { use, useEffect, useState } from "react";

const Page = () => {
  const [filteredBlogs, set] = useState();
  const getSaved = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/getsave`,

        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      set(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSaved();
  }, []);
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Saved Blogs</h1>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              title={blog.title}
              desc={blog.description}
              time={blog.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
          <div className="mb-4 rounded-full bg-gray-100 p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5v14l7-4 7 4V5H5z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            No Saved Blogs
          </h2>

          <p className="mt-2 max-w-md text-center text-gray-500">
            You haven't saved any blogs yet. Start exploring and bookmark your
            favorite blogs to read them later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
