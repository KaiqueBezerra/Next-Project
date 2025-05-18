"use client";

import { useEffect, useRef, useState } from "react";

import { notFound } from "next/navigation";

import { Projects } from "@/components/projects";

import projectsByUserGet, {
  Project,
} from "@/actions/projects/project-by-user-get";

import Loading from "@/app/loading";

import { toast } from "react-toastify";

export function MeProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(true);

  const fetching = useRef(false);

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
      const actionData = await projectsByUserGet(page, 4);
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

        if (data.length < 4) setInfinite(false);
      }
    }
    getPageProjects();
  }, [page]);

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

  if (!data) return notFound();
  return (
    <div className="flex flex-col gap-6 py-7 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-serif underline">Projetos</h1>
      </div>

      {data.length > 0 ? (
        <Projects project={data} />
      ) : (
        <div>
          <div className="text-center">
            <h1 className="text-2xl font-serif">Nenhum Projeto Criado.</h1>
          </div>

          {/* <h3 className="text-2xl text-amber-500">
              Seus projetos ficariam assim
            </h3>
          </div>
          <div className="flex justify-around flex-wrap gap-7 p-7">
            <ProjectExamples />
          </div> */}
        </div>
      )}

      {data.length > 0 && (
        <div className="text-center">
          {infinite ? (
            loading && <Loading />
          ) : (
            <p>Não há mais projetos para carregar.</p>
          )}
        </div>
      )}
    </div>
  );
}
