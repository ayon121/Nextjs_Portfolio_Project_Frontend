"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

interface IBlog {
    _id: string;
    title: string;
    description: string;
    socialLink?: string;
    photo: string;
}

export default function AdminAllBlogs() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);

    const [editBlog, setEditBlog] = useState<IBlog | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
            const data = await res.json();
            setBlogs(data.data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Delete blog
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setBlogs((prev) => prev.filter((b) => b._id !== id));
            } else {
                console.error("Failed to delete blog");
                toast.error("Failed to delete blog")
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Open modal
    const openEditModal = (blog: IBlog) => {
        setEditBlog(blog);
        setIsEditModalOpen(true);
    };

    // Close modal
    const closeEditModal = () => {
        setEditBlog(null);
        setIsEditModalOpen(false);
    };

    // Update blog
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editBlog) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${editBlog._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editBlog),
            });

            if (res.ok) {
                toast.success("Blog Updated")
                setBlogs((prev) =>
                    prev.map((b) => (b._id === editBlog._id ? editBlog : b))
                );
                closeEditModal();
            } else {
                console.error("Failed to update blog");
                toast.error("Failed to update blog")
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <main className="max-w-6xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6 uppercase">Manage Blogs</h1>

            {loading ? (
                <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="border rounded-lg p-4 shadow-sm flex flex-col"
                        >
                            <div className="w-full h-40 relative rounded-md overflow-hidden mb-3">
                                <Image src={blog.photo} alt={blog.title} fill className="object-cover" />
                            </div>
                            <h2 className="text-lg font-semibold">{blog.title}</h2>
                            <div
                                className="mt-6 text-lg leading-relaxed text-gray-800"
                                dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) }}
                            />

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => openEditModal(blog)}
                                    className="text-white uppercase bg-main py-2 px-4 rounded-lg hover:bg-main/80"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="text-red-600 uppercase bg-white py-2 px-4 rounded-lg border-2 border-main"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editBlog && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
                            onClick={closeEditModal}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

                        <form className="space-y-4" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={editBlog.title}
                                onChange={(e) =>
                                    setEditBlog({ ...editBlog, title: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Title"
                            />

                            <JoditEditor
                                ref={editor}
                                value={editBlog.description} 
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
                                onBlur={(newContent) => {
                                    setEditBlog({ ...editBlog, description: newContent });
                                }}
                            />

                            <input
                                type="text"
                                value={editBlog.socialLink || ""}
                                onChange={(e) =>
                                    setEditBlog({ ...editBlog, socialLink: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Social Link"
                            />

                            <input
                                type="text"
                                value={editBlog.photo}
                                onChange={(e) =>
                                    setEditBlog({ ...editBlog, photo: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Photo URL"
                            />

                            <button
                                type="submit"
                                className="bg-main text-white px-4 py-2 rounded hover:bg-main/80"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
