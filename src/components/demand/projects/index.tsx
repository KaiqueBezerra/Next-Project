import { Project } from "@/actions/projects-get";
import ProjectCard from "../project-card";
import styles from "./index.module.css";

export default function Projects({ project }: { project: Project[] }) {
  return (
    <div className={styles.projects}>
      {project.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
