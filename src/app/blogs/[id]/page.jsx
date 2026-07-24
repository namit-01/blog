"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Blog
  const fetchBlog = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog/${id}`,
      );

      setBlog(data.blog);
      setAuthor(data.author);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Empty Functions ----------------

  const fetchComment = async () => {};

  const addComment = async () => {};

  const deleteComment = async (id) => {};

  const deleteBlog = async () => {};

  const saveBlog = async () => {};

  // -------------------------------------------------

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-80 w-full object-cover"
        />

        <div className="p-8">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            {blog.category}
          </span>

          <h1 className="mt-4 text-4xl font-bold">{blog.title}</h1>

          <p className="mt-4 text-lg text-gray-600">{blog.description}</p>

          <div className="mt-6 flex items-center gap-3 border-b pb-6">
            <img
              src={author?.image}
              className="h-12 w-12 rounded-full object-cover"
              alt=""
            />

            <div>
              <h2 className="font-semibold">{author?.name}</h2>
              <p className="text-sm text-gray-500">{author?.email}</p>
            </div>
          </div>

          <div
            className="prose mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.blogcontent,
            }}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-5 text-2xl font-bold">Comments</h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="min-h-28 w-full rounded-xl border p-4 outline-none"
        />

        <button
          onClick={addComment}
          className="mt-4 rounded-xl bg-black px-6 py-3 text-white"
        >
          Post Comment
        </button>

        <div className="mt-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((item) => (
              <div key={item.id} className="rounded-xl border p-4">
                <h3 className="font-semibold">{item.username}</h3>

                <p className="mt-2">{item.comment}</p>

                <button
                  onClick={() => deleteComment(item.id)}
                  className="mt-3 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
