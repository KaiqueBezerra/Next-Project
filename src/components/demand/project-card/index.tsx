import { formatDistanceToNow, parseISO } from "date-fns";
import { Star, StarOff } from "lucide-react";
import { Project } from "@/actions/projects/projects-get";
import { useUser } from "@/context/userContext";
import { ptBR } from "date-fns/locale";
import styles from "./index.module.css";
import Link from "next/link";
import favoritePost from "@/actions/favorites/favorite-post";

export function ProjectCard({ project }: { project: Project }) {
  const { user } = useUser();

  const time = project.createdAt;

  console.log(project);
  console.log(user);

  const parsedDate = parseISO(time);

  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  async function addFavorite() {
    await favoritePost(project.id);
  }

  return (
    <div className={styles.project}>
      <div className={styles.header}>
        <h1>{project.name}</h1>
        <Star className={styles.icon} onClick={addFavorite} />
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
