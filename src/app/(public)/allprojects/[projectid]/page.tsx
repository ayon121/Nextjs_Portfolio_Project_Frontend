
import ProjectDetailsClient from "@/components/modules/Pages/ProjectDetailsClient";
import Navbar from "@/components/modules/Shared/Navbar";


async function getProject(projectid: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectid}`, {
            next: { revalidate: 30 }, // ISR
        });


        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

export default async function ProjectDetails({ params }: { params: { projectid: string } }) {
    const project = await getProject(params.projectid);

    console.log(project.data);

    if (!project.data) {
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
                <div className="max-w-3xl mx-auto text-center py-12">
                    <h2 className="text-2xl font-semibold text-red-500">Project not found.</h2>
                </div>
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
            <ProjectDetailsClient project={project.data} />
        </div>
    )
}
