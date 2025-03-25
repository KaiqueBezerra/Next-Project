"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { ProjectAndCount } from "@/actions/projects/project-get";
import { Settings, Star } from "lucide-react";
import { SettingsModal } from "../settings-modal";
import { useUser } from "@/context/userContext";
import { ptBR } from "date-fns/locale";
import verifyFavoriteByUser from "@/actions/favorites/verify-favorite-by-user";
import favoriteDelete from "@/actions/favorites/favorite-delete";
import favoritePost from "@/actions/favorites/favorite-post";
import styles from "./index.module.css";

import { notFound } from "next/navigation";
import Link from "next/link";

export function DemandModal({
  data: { project, favoriteCount },
}: {
  data: ProjectAndCount;
}) {
  const [isFavorited, setIsFavorited] = useState<boolean | null>(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { user } = useUser();

  if (!project) notFound();

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
    } else {
      alert("Vocês precisa estar logado para favoritar um projeto.");
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

  const parsedDateUpdatedAt = parseISO(project.updatedAt);
  const relativeTimeUpdatedAt = formatDistanceToNow(parsedDateUpdatedAt, {
    addSuffix: true,
    locale: ptBR,
  });

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      window.location.href = "/demand";
    }
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div
        className={styles.modalContent}
        style={{ display: modal ? "none" : "" }}
      >
        <div className={styles.header}>
          <h1>{project.name}</h1>
        </div>
        {user?.id !== project.userId && (
          <div>
            <p className={styles.author}>
              <Link href={`/profile/${project.userId}`}>
                {project.User?.name}
              </Link>
            </p>
          </div>
        )}
        <div className={styles.time}>
          <p>Publicado: {relativeTime}</p>
          {relativeTime !== relativeTimeUpdatedAt && (
            <p>Atualizado: {relativeTimeUpdatedAt}</p>
          )}
        </div>
        <div className={styles.description}>
          <p>{project.description}</p>
        </div>
        <div className={styles.requirements}>
          {project.requirements.map((requirement) => (
            <p key={requirement}>{requirement}</p>
          ))}
        </div>
        <div className={styles.link}>
          {user?.id !== project.userId && (
            <div>
              <Link
                href={`https://wa.me/55${project.phoneNumber}`}
                target="_blank"
              >
                Estou interessado
              </Link>
            </div>
          )}

          <div>
            {user?.id !== project.userId ? (
              isFavorited ? (
                <div className={styles.favoriteContainer}>
                  <Star
                    className={
                      !loading ? styles.starFavorited : styles.iconDisabled
                    }
                    onClick={!loading ? removeFavorite : () => {}}
                  />
                  <Settings
                    className={styles.settings}
                    onClick={() => setModal(!modal)}
                  />
                </div>
              ) : (
                <div className={styles.favoriteContainer}>
                  <Star
                    className={!loading ? styles.star : styles.iconDisabled}
                    onClick={!loading ? addFavorite : () => {}}
                  />
                  <Settings
                    className={styles.settings}
                    onClick={() => setModal(!modal)}
                  />
                </div>
              )
            ) : (
              <div className={styles.favoriteCountContainer}>
                {favoriteCount}
                <Star className={styles.favoriteCountStar} />
                <Settings
                  className={styles.settings}
                  onClick={() => setModal(!modal)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {modal && (
        <SettingsModal setModal={setModal} user={user} project={project} />
      )}
    </div>
  );
}
