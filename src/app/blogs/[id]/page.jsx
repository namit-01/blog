"use client";

import { useAppData } from "@/context/AppProvider";
import axios from "axios";
import { Bookmark, BookmarkCheck, Edit, Trash2, User2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAppData();
  const router = useRouter();

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

  const fetchComment = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/allcomments/${id}`,
      );
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/add/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (cid) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/delcom/${cid}`,

        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      console.log(data);
    } catch (err) {}
  };

  const deleteBlog = async () => {
    try {
      setLoading(true);
      const sessionId = localStorage.getItem("sessionId");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTHOR_API_URL}/api/v1/delete/blog/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      setLoading(false);
      toast.success("Blog deleted successfully");

      console.log(data);
    } catch (err) {
      console.log(err.response?.data);
      console.log(err.response?.data?.message);
      console.log(err.message);
    }
  };

  const saveBlog = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/save/${id}`,

        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      if (data.message == "Blog Saved") {
        setSaved(true);
      } else {
        setSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
      if (data[0].blogid == id) {
        setSaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // -------------------------------------------------

  useEffect(() => {
    fetchBlog();
    fetchComment();
    getSaved();
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
      {/* Blog Card */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-[420px] w-full object-cover"
        />

        <div className="p-8">
          {/* Category + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
              {blog.category}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={saveBlog}
                className="rounded-xl border p-3 transition hover:bg-slate-100"
              >
                {saved ? (
                  <BookmarkCheck className="text-green-600" />
                ) : (
                  <Bookmark />
                )}
              </button>
              {blog?.author === user?.userId && (
                <>
                  <button className="rounded-xl border border-blue-500 p-3 text-blue-600 transition hover:bg-blue-50">
                    <Edit />
                  </button>

                  <button
                    onClick={deleteBlog}
                    disabled={loading}
                    className="rounded-xl border border-red-500 p-3 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            {blog.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {blog.description}
          </p>

          {/* Author */}
          <div className="mt-8 flex items-center gap-4 border-y py-6">
            {author?.image ? (
              <img
                src={author.image}
                alt={author.name}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
                <User2 />
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold">{author?.name}</h2>
              <p className="text-sm text-slate-500">{author?.email}</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.blogcontent,
            }}
          />
        </div>
      </div>

      {/* Comment Box */}
      <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="mb-5 text-2xl font-bold">Leave a Comment</h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts..."
          className="min-h-32 w-full rounded-2xl border p-4 outline-none transition focus:border-black"
        />

        <button
          onClick={addComment}
          className="mt-5 rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Post Comment
        </button>
      </div>

      {/* Comments */}
      <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
            No comments yet.
          </div>
        ) : (
          <div className="space-y-5">
            {comments.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between rounded-2xl border p-5 transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
                    <User2 />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.username}</h3>

                    <p className="mt-2 text-slate-700">{item.comment}</p>

                    <p className="mt-2 text-xs text-slate-400">
                      {item.create_at}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteComment(item.id)}
                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
