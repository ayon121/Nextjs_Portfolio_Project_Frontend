"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog`
      );
      const data = await res.json();

      console.log(data);
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        console.error("Failed to delete blog");
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
                <Image
                  src={blog.photo}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="line-clamp-2 text-gray-600">
                {blog.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
              </p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/admin/blogs/edit/${blog._id}`}
                  className="text-white uppercase bg-main py-2 px-4 rounded-lg hover:bg-main/80"
                >
                  Edit
                </Link>

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
    </main>
  );
}
