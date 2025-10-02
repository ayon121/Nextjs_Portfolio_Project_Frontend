import { IBlog } from "@/components/modules/Admin/Blog/AddBlog";
import Navbar from "@/components/modules/Shared/Navbar";
import Image from "next/image";


async function getBlog(id: string): Promise<IBlog | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
}

export default async function BlogDetails({ params }: { params: { blogid: string } }) {
    const blog = await getBlog(params.blogid);

    if (!blog) {
        return (
            <div className="max-w-3xl mx-auto text-center py-12">
                <h2 className="text-2xl font-semibold text-red-500">
                    Blog not found.
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#ffffff",
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />
            <Navbar></Navbar>
            <article className="max-w-3xl mx-auto px-4 py-12 relative z-40 pt-32">
                <div className="relative w-full h-80 mb-6">
                    <Image
                        src={blog.photo}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-xl shadow-md"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>



                <div
                    className="mt-6 text-lg leading-relaxed text-gray-800"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />


                {blog.socialLink && (
                    <a
                        href={blog.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block text-main font-semibold hover:underline"
                    >
                        Read More
                    </a>
                )}
            </article>
        </div>
    );
}
