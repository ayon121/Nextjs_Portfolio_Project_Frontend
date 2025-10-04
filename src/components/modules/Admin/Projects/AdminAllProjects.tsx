"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface IProject {
    _id: string;
    title: string;
    description: string;
    features: string[];
    thumbnail: string;
    liveUrl?: string;
    repoUrl?: string;
}

export default function AdminAllProjects() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);

    const [editProject, setEditProject] = useState<IProject | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`);
            const data = await res.json();
            setProjects(data.data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Delete project
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProjects((prev) => prev.filter((p) => p._id !== id));
                toast.success("Project Deleted");
            } else {
                console.error("Failed to delete project");
                toast.error("Failed to delete project");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openEditModal = (project: IProject) => {
        setEditProject(project);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditProject(null);
        setIsEditModalOpen(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editProject) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${editProject._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProject),
            });

            if (res.ok) {
                toast.success("Project Updated");
                setProjects((prev) =>
                    prev.map((p) => (p._id === editProject._id ? editProject : p))
                );
                closeEditModal();
            } else {
                console.error("Failed to update project");
                toast.error("Failed to update project");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="max-w-6xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6 uppercase">Manage Projects</h1>

            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="border rounded-lg p-4 shadow-sm flex flex-col"
                        >
                            <div className="w-full h-40 relative rounded-md overflow-hidden mb-3">
                                 <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="400" />
                            </div>
                            <h2 className="text-lg font-semibold">{project.title}</h2>
                            <div
                                className="mt-6 text-lg leading-relaxed text-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: project.description.slice(0, 100),
                                }}
                            />

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => openEditModal(project)}
                                    className="text-white uppercase bg-main py-2 px-4 rounded-lg hover:bg-main/80"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(project._id)}
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
            {isEditModalOpen && editProject && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-[90vh] overflow-y-scroll">
                        <button
                            className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
                            onClick={closeEditModal}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">Edit Project</h2>

                        <form className="space-y-4" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={editProject.title}
                                onChange={(e) =>
                                    setEditProject({ ...editProject, title: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Title"
                            />

                            <JoditEditor
                                ref={editor}
                                value={editProject.description}
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
                                    setEditProject({ ...editProject, description: newContent });
                                }}
                            />

                            <input
                                type="text"
                                value={editProject.liveUrl || ""}
                                onChange={(e) =>
                                    setEditProject({ ...editProject, liveUrl: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Live Site URL"
                            />

                            <input
                                type="text"
                                value={editProject.repoUrl || ""}
                                onChange={(e) =>
                                    setEditProject({ ...editProject, repoUrl: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Repository URL"
                            />

                            <input
                                type="text"
                                value={editProject.thumbnail}
                                onChange={(e) =>
                                    setEditProject({ ...editProject, thumbnail: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Thumbnail URL"
                            />

                            {/* Features Editor */}
                            <textarea
                                value={editProject.features.join("\n")}
                                onChange={(e) =>
                                    setEditProject({
                                        ...editProject,
                                        features: e.target.value.split("\n"),
                                    })
                                }
                                className="w-full border px-3 py-2 rounded min-h-[100px]"
                                placeholder="Features (one per line)"
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
