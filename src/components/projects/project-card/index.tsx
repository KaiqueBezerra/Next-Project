import { Project } from "@/actions/projects/projects-get";
import { useUser } from "@/context/userContext";

import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "./index.module.css";

import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const { user } = useUser();

  const parsedDate = parseISO(project.createdAt);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  const parsedDateUpdatedAt = parseISO(project.updatedAt);
  const relativeTimeUpdatedAt = formatDistanceToNow(parsedDateUpdatedAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className={styles.project}>
      <div className={styles.header}>
        <h1
          style={{
            color:
              user?.id === project.userId ? "var(--color-3)" : "var(--color-2)",
          }}
        >
          {project.name}
        </h1>
      </div>
      <div className={styles.time}>
        <p>Publicado: {relativeTime} </p>
        {relativeTime !== relativeTimeUpdatedAt && (
          <p>Atualizado: {relativeTimeUpdatedAt}</p>
        )}
      </div>
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
