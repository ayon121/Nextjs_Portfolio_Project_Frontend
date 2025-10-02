"use client";

import { IProject } from "@/components/modules/Admin/Projects/AddProjectForm";
import Image from "next/image";

interface Props {
  project: IProject;
}

export default function ProjectDetailsClient({ project }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 pt-28 relative z-40">
      {/* Thumbnail */}
      {project.thumbnail && project.thumbnail.trim() !== "" && (
        <div className="relative w-full h-80 mb-6">
          <Image
            src={project.thumbnail}
            alt={project.title || "Project Image"}
            fill
            className="object-cover rounded-xl shadow-md"
            unoptimized
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title || "Untitled Project"}</h1>

      {/* Description */}
      <div
        className="mt-6 text-lg leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: project.description || "" }}
      />

      <h1 className="text-xl font-bold">Top Features or Technology</h1>
      {/* Features */}
      {project.features?.length > 0 && (
        <ul className="mt-6 list-disc list-inside text-gray-700">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      {/* Links */}
      <div className="mt-6 flex gap-4">
        {project.liveUrl?.trim() && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main font-semibold hover:bg-main hover:text-white  py-2 px-4 border-2 border-main border-double rounded-xl"
          >
            Live Site
          </a>
        )}

        {project.repoUrl?.trim() && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main font-semibold hover:bg-main hover:text-white  py-2 px-4 border-2 border-main border-double rounded-xl"
          >
            Repository
          </a>
        )}
      </div>
    </article>
  );
}
