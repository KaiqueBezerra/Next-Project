import { ProjectCard } from "./project-card";
import { Project } from "@/actions/projects/projects-get";
import styles from "./index.module.css";

export function Projects({ project }: { project: Project[] }) {
  return (
    <div className={styles.projects}>
      {project.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
