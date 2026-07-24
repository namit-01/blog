"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { blogCategories } from "@/context/AppProvider";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",

    image: null,
    blogcontent: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("blogcontent", formData.blogcontent);
      data.append("image", formData.image);

      const sessionId = localStorage.getItem("sessionId");

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_AUTHOR_API_URL}/api/v1/update/blog/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );

      toast.success("Blog published successfully!");

      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
        blogcontent: "",
      });

      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };
  const handleAiTitle = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTHOR_API_URL}/api/v1/ai/title`,
        { text: formData.title },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      setFormData({ ...formData, title: res.data.title });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAiBlog = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTHOR_API_URL}/api/v1/ai/blog`,
        { blog: formData.blogcontent },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      setFormData({ ...formData, blogcontent: res.data.blog });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAiDescription = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTHOR_API_URL}/api/v1/ai/description`,
        { title: formData.title, description: formData.description },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );
      setFormData({ ...formData, description: res.data.description });
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="rounded-2xl border-0 shadow-xl">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Edit Blog
            </CardTitle>
            <p className="mt-2 text-sm text-slate-500">
              Share your ideas with the world.
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>

                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter blog title"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-black"
                  />

                  <button
                    type="button"
                    onClick={handleAiTitle}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {blogCategories?.map((e, i) => (
                      <SelectItem key={i} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Write a short description..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-black"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={handleAiDescription}
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Label htmlFor="content">Blog Content</Label>

                  <textarea
                    id="content"
                    value={formData.blogcontent}
                    onChange={(e) =>
                      setFormData({ ...formData, blogcontent: e.target.value })
                    }
                    rows={10}
                    placeholder="Write your blog..."
                    className="w-full min-h-[350px] rounded-2xl border border-slate-300 bg-white px-6 py-5 pr-14 text-base leading-8 tracking-normal text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10 resize-y"
                  />
                  <button
                    type="button"
                    onClick={handleAiBlog}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="block w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-700
      file:mr-4 file:rounded-lg file:border-0
      file:bg-black file:px-4 file:py-2
      file:text-sm file:font-medium
      file:text-white hover:file:bg-slate-800"
                />

                {formData.image && (
                  <p className="text-sm text-slate-500">
                    Selected:{" "}
                    <span className="font-medium">{formData.image.name}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-xl border border-slate-300 px-8 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Publishing..." : "Publish Blog"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
