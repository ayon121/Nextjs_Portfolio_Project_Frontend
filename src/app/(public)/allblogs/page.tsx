
import Navbar from "@/components/modules/Shared/Navbar";
import Image from "next/image";
import Link from "next/link";

interface IBlog {
    _id?: string;
    title: string;
    description: string;
    socialLink?: string;
    photo: string;
}

export default async function AllBlogsPage() {
    const res = await fetch(`https://backend-rho-plum-42.vercel.app/api/v1/blog`, {
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    const blogs = await res.json();

    return (
        <div><div className="min-h-screen w-full bg-white relative">
            {/* Noise Texture (Darker Dots) Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#ffffff",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />
        
            <Navbar></Navbar>
            <main className="max-w-6xl mx-auto px-6 py-12 pt-36 z-30 relative">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase">
                    All Blogs
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs?.data?.map((blog: IBlog) => (
                        <div
                            key={blog._id}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-lg transition flex flex-col justify-stretch "
                        >

                            <Image
                                width={300}
                                height={300}
                                src={blog.photo}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {blog.title}
                                </h2>
                                {/* <p className="text-gray-600 text-sm line-clamp-3">
                                {blog.description.slice(0, 120)}...
                            </p> */}
                                <div
                                    className="mt-6 text-lg leading-relaxed text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) }}
                                />

                                <div className="mt-4 flex justify-between items-center">
                                    <Link
                                        href={`/allblogs/${blog._id}`}
                                        className="text-main font-medium hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            </div>
        </div>
    );
}
