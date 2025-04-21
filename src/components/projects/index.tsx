import { ProjectCard } from "./project-card";
import { Project } from "@/actions/projects/projects-get";

export function Projects({ project }: { project: Project[] }) {
  return (
    <div className="flex justify-around flex-wrap gap-7">
      {project.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
