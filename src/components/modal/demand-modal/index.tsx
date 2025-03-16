"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { ProjectAndCount } from "@/actions/projects/project-get";
import { useUser } from "@/context/userContext";
import { ptBR } from "date-fns/locale";
import { Star } from "lucide-react";
import verifyFavoriteByUser from "@/actions/favorites/verify-favorite-by-user";
import favoriteDelete from "@/actions/favorites/favorite-delete";
import favoritePost from "@/actions/favorites/favorite-post";
import styles from "./index.module.css";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function DemandModal({
  data: { project, favoriteCount },
}: {
  data: ProjectAndCount;
}) {
  const [isFavorited, setIsFavorited] = useState<boolean | null>(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const pathname = usePathname();

  // Função que busca se o projeto foi favoritado
  useEffect(() => {
    async function checkIfFavorited() {
      if (user && project.id) {
        const { data } = await verifyFavoriteByUser(project.id);
        setIsFavorited(data);
      }
    }
    checkIfFavorited();
  }, [user, project.id]);

  // Função para adicionar o projeto aos favoritos
  async function addFavorite() {
    if (user) {
      setLoading(true);
      const { data } = await favoritePost(project.id);
      setLoading(false);
      setIsFavorited(data);
    }
  }

  // Função para remover o projeto dos favoritos
  async function removeFavorite() {
    if (user) {
      setLoading(true);
      const { data } = await favoriteDelete(project.id);
      setLoading(false);
      setIsFavorited(data);
    }
  }

  const parsedDate = parseISO(project.createdAt);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      if (pathname.includes("/demand")) {
        window.location.href = "/demand";
      } else {
        window.location.href = "/me";
      }
    }
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>{project.name}</h1>
          <div>
            {user?.id !== project.userId ? (
              isFavorited ? (
                <Star
                  className={
                    !loading ? styles.starFavorited : styles.iconDisabled
                  }
                  onClick={!loading ? removeFavorite : () => {}}
                />
              ) : (
                <Star
                  className={!loading ? styles.star : styles.iconDisabled}
                  onClick={!loading ? addFavorite : () => {}}
                />
              )
            ) : (
              <div className={styles.favoriteCountContainer}>
                {favoriteCount}
                <Star className={styles.favoriteCountStar} />
              </div>
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
