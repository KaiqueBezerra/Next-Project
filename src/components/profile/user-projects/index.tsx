"use client";

import { useEffect, useRef, useState } from "react";

import { notFound } from "next/navigation";

import { Projects } from "@/components/projects";
import { useUser } from "@/context/userContext";

import { Project } from "@/actions/projects/project-by-user-get";
import projectsByUserNoTokenGet from "@/actions/projects/projects-by-user-no-token-get";

import Loading from "@/app/loading";

import { toast } from "react-toastify";

export function UserProjects({ userId }: { userId: string }) {
  const [data, setData] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(true);

  const fetching = useRef(false);

  const { user } = useUser();

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    async function getPageProjects() {
      const actionData = await projectsByUserNoTokenGet(page, 6, userId);
      if (actionData && actionData.data !== null) {
        const { data, ok } = actionData;

        if (!ok) {
          toast.error("Erro ao buscar projetos. Tente novamente mais tarde.");
          setInfinite(false);
          return;
        }

        // Verificando se os projetos já existentes têm o mesmo ID que os novos
        setData((currentProjects) => {
          const newProjects = data.filter(
            (newProject) =>
              !currentProjects.some(
                (existingProject) => existingProject.id === newProject.id
              )
          );

          return [...currentProjects, ...newProjects];
        });

        if (data.length < 6) setInfinite(false);
      }
    }
    getPageProjects();
  }, [page, userId]);

  useEffect(() => {
    if (infinite) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  useEffect(() => {
    if (user?.id === userId) {
      window.location.href = "/me";
    }
  }, [user?.id, userId]);

  if (!data) return notFound();

  return (
    <div
      className="flex flex-col text-white p-5 gap-5
      max-md:flex-col max-md:items-center"
    >
      {data.length > 0 ? (
        <Projects project={data} />
      ) : (
        <div className="text-center p-5">
          <h3>Este usuário ainda não criou nenhum projeto.</h3>
        </div>
      )}

      {data.length > 0 && (
        <div className="text-center">
          {infinite ? (
            loading && <Loading />
          ) : (
            <p className="m-4">Não há mais projetos para carregar.</p>
          )}
        </div>
      )}
    </div>
  );
}
