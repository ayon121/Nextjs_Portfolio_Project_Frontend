"use client";

import { useRef, useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addblog } from "@/actions/blog";


const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export interface IBlog {
  _id?: string;
  title: string;
  description: string;
  socialLink?: string;
  photo: string;
}

export default function AddBlogForm() {
  const editor = useRef(null);

  const [formData, setFormData] = useState<IBlog>({
    title: "",
    description: "",
    socialLink: "",
    photo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.photo) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await addblog(formData);
      if (res.success) {
        toast.success("Blog Added Successfully");
        setFormData({
          title: "",
          description: "",
          socialLink: "",
          photo: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add Blog");
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-2xl border border-main">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">
          Add New Blog
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded text-main"
              required
            />
            <input
              type="text"
              placeholder="Social Link (Optional)"
              name="socialLink"
              value={formData.socialLink}
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded text-main"
            />
          </div>

          <div className="my-3 bg-white rounded-3xl">
            <JoditEditor
              ref={editor}
              value={formData.description}
              config={{
                readonly: false,
                toolbarAdaptive: false,
                buttons: [
                  "bold",
                  "italic",
                  "ul",
                  "ol",
                  "link",
                  "brush",
                  "hr",
                  "align",
                  "preview",
                ],
              }}
              onBlur={(newContent: string) =>
                setFormData((prev) => ({ ...prev, description: newContent }))
              }
            />
          </div>

          <div className="my-3">
            <input
              type="text"
              placeholder="Photo URL (Use Imgbb)"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded text-main"
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 uppercase bg-main w-full text-xl text-white py-2.5 rounded hover:bg-main/60"
            >
              Add Blog Post
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
