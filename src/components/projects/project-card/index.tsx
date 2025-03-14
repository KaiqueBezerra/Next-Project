import { formatDistanceToNow, parseISO } from "date-fns";
import { Project } from "@/actions/projects/projects-get";
import { ptBR } from "date-fns/locale";
import styles from "./index.module.css";

import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const time = project.createdAt;
  const parsedDate = parseISO(time);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className={styles.project}>
      <div className={styles.header}>
        <h1>{project.name}</h1>
      </div>
      <p className={styles.time}>Publicado: {relativeTime}</p>
      <div className={styles.description}>
        <p>{project.description}</p>
        <div className={styles.requirements}>
          <div className={styles.requirement}>
            {project.requirements.map((requirement) => (
              <p key={requirement}>{requirement}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.link}>
        <Link href={`/demand/${project.id}`}>Ver mais</Link>
      </div>
    </div>
  );
}
