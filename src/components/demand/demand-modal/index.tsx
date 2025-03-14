"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { ProjectAndCount } from "@/actions/projects/project-get";
import { Star, StarOff } from "lucide-react";
import { useUser } from "@/context/userContext";
import { ptBR } from "date-fns/locale";
import styles from "./index.module.css";
import Link from "next/link";
import favoritePost from "@/actions/favorites/favorite-post";
import favoriteDelete from "@/actions/favorites/favorite-delete"; // Função que você mencionou para deletar favorito
import favoritesByUserGet from "@/actions/favorites/favorites-by-user-get";

export function DemandModal({
  data: { project, favoriteCount },
}: {
  data: ProjectAndCount;
}) {
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

  // Função para adicionar o projeto aos favoritos
  async function addFavorite() {
    if (user) {
      await favoritePost(project.id);
      setIsFavorited(true);
    }
  }

  // Função para remover o projeto dos favoritos
  async function removeFavorite() {
    if (user) {
      await favoriteDelete(project.id);
      setIsFavorited(false);
    }
  }

  const parsedDate = parseISO(project.createdAt);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) window.location.href = "/demand";
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>{project.name}</h1>
          <div>
            {user?.id !== project.userId ? (
              isFavorited ? (
                <StarOff className={styles.icon} onClick={removeFavorite} />
              ) : (
                <Star className={styles.icon} onClick={addFavorite} />
              )
            ) : (
              <div style={{ fontSize: "20px" }}>⭐{favoriteCount}</div>
            )}
          </div>
        </div>
        <p style={{ margin: "10px 0" }}>{relativeTime}</p>
        <div className={styles.description}>
          <p>{project.description}</p>
        </div>
        <div className={styles.requirements}>
          {project.requirements.map((requirement) => (
            <p key={requirement}>{requirement}</p>
          ))}
        </div>
        <div className={styles.link}>
          <Link href={`https://wa.me/55${project.phoneNumber}`} target="_blank">
            Estou interessado
          </Link>
        </div>
      </div>
    </div>
  );
}
