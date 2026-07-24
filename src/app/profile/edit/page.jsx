"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppProvider";

const EditProfile = () => {
  const { user, setUser } = useAppData();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const sessionId = localStorage.getItem("sessionId");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/updateUser`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        },
      );

      // If backend returns updated user
      if (data.user) {
        setUser(data.user);
      }

      router.push("/profile");
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="Write something about yourself..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-pink-500"
              placeholder="https://instagram.com/username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="https://facebook.com/username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-sky-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border py-3 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-black-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
