"use client";

import { useEffect, useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IAboutMe {
  _id?: string;
  name: string;
  bio: string;
  email: string;
  location?: string;
  lasteducation?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    portfolio?: string;
  };
}

export default function AboutMeForm() {
  const [formData, setFormData] = useState<IAboutMe>({
    name: "",
    bio: "",
    email: "",
    location: "",
    lasteducation: "",
    socialLinks: {
      github: "",
      linkedin: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      portfolio: "",
    },
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing AboutMe 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`);
        const data = await res.json();
        if (data?.data) {
          setFormData({
            ...data.data,
            socialLinks: data.data.socialLinks || {
              github: "",
              linkedin: "",
              youtube: "",
              twitter: "",
              facebook: "",
              instagram: "",
              portfolio: "",
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch About Me:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle social links separately
    if (Object.keys(formData.socialLinks || {}).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.bio || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data?.data) {
        setFormData({
          ...data.data,
          socialLinks: data.data.socialLinks || {
            github: "",
            linkedin: "",
            youtube: "",
            twitter: "",
            facebook: "",
            instagram: "",
            portfolio: "",
          },
        });
        toast.success("About Me Updated Successfully");
      } else {
        toast.error(data?.message || "Failed to update About Me");
      }
    } catch (error) {
      console.error("Failed to update About Me:", error);
      toast.error("Failed to update About Me");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-2xl border border-main">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">
          Update About Me
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 border border-main px-3 rounded"
            required
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full py-2 border border-main px-3 rounded"
            rows={4}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-2 border border-main px-3 rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full py-2 border border-main px-3 rounded"
          />
          <input
            type="text"
            name="lasteducation"
            placeholder="Last Education"
            value={formData.lasteducation || ""}
            onChange={handleChange}
            className="w-full py-2 border border-main px-3 rounded"
          />

          {/* Social Links */}
          <h2 className="font-semibold mt-4">Social Links</h2>
          {Object.keys(formData.socialLinks || {}).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
              value={
                formData.socialLinks?.[key as keyof typeof formData.socialLinks] || ""
              }
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded"
            />
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-main text-white py-2.5 rounded hover:bg-main/70"
          >
            Save About Me
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
