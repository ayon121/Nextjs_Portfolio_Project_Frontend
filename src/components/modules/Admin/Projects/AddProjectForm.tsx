"use client";

import { useRef, useState, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
}

export default function AddProjectForm() {
  const editor = useRef(null);
  const [formData, setFormData] = useState<IProject>({
    title: "",
    description: "",
    features: [],
    thumbnail: "",
    liveUrl: "",
    repoUrl: "",
  });

  const [featureInput, setFeatureInput] = useState("");


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success && data?.data) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput],
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.thumbnail) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Project updated successfully!");
      } else {
        toast.error(result.message || "Failed to update project.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the project.");
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-2xl border border-main">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">
          Update Project
        </h1>

        <form onSubmit={handleSubmit}>
  
          <div className="flex flex-col gap-4 my-3">
            <input
              type="text"
              placeholder="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded text-main"
              required
            />
            <input
              type="text"
              placeholder="Live Site URL (Optional)"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full py-2 border border-main px-3 rounded text-main"
            />
            <input
              type="text"
              placeholder="Repository URL (Optional)"
              name="repoUrl"
              value={formData.repoUrl}
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
              onBlur={(newContent) =>
                setFormData((prev) => ({ ...prev, description: newContent }))
              }
            />
          </div>

          <div className="my-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="flex-1 py-2 border border-main px-3 rounded text-main"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-main text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(i)}
                    className="text-red-600"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div className="my-3">
            <input
              type="text"
              placeholder="Thumbnail URL From IMGBB"
              name="thumbnail"
              value={formData.thumbnail}
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
              Update Project
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
