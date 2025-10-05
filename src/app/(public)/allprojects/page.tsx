import { IProject } from "@/components/modules/Admin/Projects/AddProjectForm";
import Navbar from "@/components/modules/Shared/Navbar";
import Image from "next/image";
import Link from "next/link";



export default async function AllProjectsPage() {
  const res = await fetch(`https://protfoliobackend-teal.vercel.app/api/v1/projects`, {
    next: { revalidate: 30 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects = await res.json();

  return (
    <div>
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

        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-12 pt-36 z-30 relative">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase">
            All Projects
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.data?.map((project: IProject) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-lg transition flex flex-col justify-stretch"
              >
                <Image
                  width={400}
                  height={300}
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {project.title}
                  </h2>

                  <div
                    className="mt-6 text-lg leading-relaxed text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: project.description.slice(0, 100),
                    }}
                  />

                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/allprojects/${project._id}`}
                      className="text-main font-medium hover:underline"
                    >
                      View Details →
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
