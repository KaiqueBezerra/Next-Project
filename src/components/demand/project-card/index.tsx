"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Star, StarOff } from "lucide-react";
import { Project } from "@/actions/projects/projects-get";
import { useUser } from "@/context/userContext";
import { ptBR } from "date-fns/locale";
import favoritesByUserGet from "@/actions/favorites/favorites-by-user-get";
import favoritePost from "@/actions/favorites/favorite-post";
import styles from "./index.module.css";

import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const [isFavorited, setIsFavorited] = useState<boolean | null>(false);
  const { user } = useUser();

  // Função que busca se o projeto foi favoritado
  useEffect(() => {
    async function checkIfFavorited() {
      if (user && project.id) {
        const { data } = await favoritesByUserGet(project.id);
        setIsFavorited(data);
      }
    }
    checkIfFavorited();
  }, [user, project.id]);

  async function addFavorite() {
    if (user) {
      await favoritePost(project.id);
      setIsFavorited(true);
    }
  }

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
        {isFavorited ? (
          <StarOff className={styles.icon} />
        ) : (
          <Star className={styles.icon} onClick={addFavorite} />
        )}
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
