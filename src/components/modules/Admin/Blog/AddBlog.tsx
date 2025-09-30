"use client";

import { useState, FormEvent } from "react";

export interface IBlog {
    _id?: string;
    title: string;
    description: string;
    socialLink?: string;
    photo: string;
}

export default function AddBlogForm() {
    const [blogData, setBlogData] = useState<IBlog>({
        title: "",
        description: "",
        socialLink: "",
        photo: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Submitted Blog Data:", blogData);
    };

    return (
        <div className="pt-16">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ">
                <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="title" className="block font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={blogData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-32"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="socialLink" className="block font-medium mb-1">
                            Social Link (optional)
                        </label>
                        <input
                            type="text"
                            id="socialLink"
                            name="socialLink"
                            value={blogData.socialLink}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="photo" className="block font-medium mb-1">
                            Photo URL (Use Imgbd)
                        </label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            value={blogData.photo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-main text-white font-semibold py-2 px-4 rounded-md hover:bg-main/80 transition-colors"
                    >
                        Submit Blog
                    </button>
                </form>
            </div>
        </div>
    );
}
