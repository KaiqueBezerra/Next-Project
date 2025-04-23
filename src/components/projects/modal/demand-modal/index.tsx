"use client";

import { useEffect, useState } from "react";
import { ProjectAndCount } from "@/actions/projects/project-get";
import { Settings, Star } from "lucide-react";
import { SettingsModal } from "../settings-modal";
import { useUser } from "@/context/userContext";

import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { notFound } from "next/navigation";
import Link from "next/link";

import verifyFavoriteByUser from "@/actions/favorites/verify-favorite-by-user";
import favoriteDelete from "@/actions/favorites/favorite-delete";
import favoritePost from "@/actions/favorites/favorite-post";

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
    <div
      className="flex items-center justify-center p-2 min-h-screen"
      onClick={handleOutsideClick}
    >
      <div
        className="flex flex-col bg-zinc-700 rounded-md p-6 sm:p-8 border-10 border-double border-zinc-800 
        text-white text-justify w-[1200px] min-h-[500px] shadow-[0px_0px_10px_0px_black] gap-2"
        style={{ display: modal ? "none" : "" }}
      >
        <div className="flex break-all">
          <h1 className="capitalize text-2xl">{project.name}</h1>
        </div>
        {user?.id !== project.userId && (
          <div>
            <p
              className="inline cursor-pointer underline-offset-5 text-amber-500 
              hover:underline hover:text-amber-800 transition-colors duration-300"
            >
              <Link href={`/profile/${project.userId}`}>
                {project.User?.name}
              </Link>
            </p>
          </div>
        )}
        <div className="italic">
          <p>Publicado: {relativeTime}</p>
          {relativeTime !== relativeTimeUpdatedAt && (
            <p>Atualizado: {relativeTimeUpdatedAt}</p>
          )}
        </div>
        <div className="break-all mt-2">
          <p className="text-2xl">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 max-w-[600px] mt-6 mb-8">
          {project.requirements.map((requirement) => (
            <p
              key={requirement}
              className="bg-amber-500 border border-zinc-800
              p-2 sm:p-2.5 inline-block font-bold text-black"
            >
              {requirement}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-end flex-1">
          {user?.id !== project.userId && (
            <div>
              <Link
                href={`https://wa.me/55${project.phoneNumber}`}
                target="_blank"
                className="border border-zinc-800 font-bold text-black 
              bg-amber-500 hover:bg-amber-800 p-2 sm:p-2.5"
              >
                Estou interessado
              </Link>
            </div>
          )}

          <div>
            {user?.id !== project.userId ? (
              isFavorited ? (
                <div className="flex gap-2 text-xl">
                  <Star
                    fill={!loading ? "#FE9A00" : ""}
                    style={{
                      cursor: !loading ? "pointer" : "wait",
                      opacity: !loading ? 1 : 0.5,
                    }}
                    onClick={!loading ? removeFavorite : () => {}}
                  />
                  <Settings
                    className="cursor-pointer hover:fill-amber-500"
                    onClick={() => setModal(!modal)}
                  />
                </div>
              ) : (
                <div className="flex gap-2 text-xl">
                  <Star
                    className="hover:fill-amber-500"
                    style={{
                      cursor: !loading ? "pointer" : "wait",
                      opacity: !loading ? 1 : 0.5,
                    }}
                    onClick={!loading ? addFavorite : () => {}}
                  />
                  {user && (
                    <Settings
                      className="cursor-pointer hover:fill-amber-500"
                      onClick={() => setModal(!modal)}
                    />
                  )}
                </div>
              )
            ) : (
              <div className="flex gap-2 items-center text-xl">
                <div className="flex gap-1 items-center">
                  {favoriteCount}
                  <Star fill="#FE9A00" />
                </div>
                <div>
                  <Settings
                    className="cursor-pointer hover:fill-amber-500"
                    onClick={() => setModal(!modal)}
                  />
                </div>
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
