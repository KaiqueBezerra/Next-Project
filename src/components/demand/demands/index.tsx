"use client";

import { useEffect, useState, useRef } from "react";
import { Projects } from "@/components/projects";
import projectsGet, { Project } from "@/actions/projects/projects-get";

import { useSearchParams } from "next/navigation";

import Loading from "@/app/loading";

export default function Demands() {
  const [data, setData] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(true);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";

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

  // Reseta os dados quando o filtro ou pesquisa muda
  useEffect(() => {
    setData([]);
    setPage(1); // Reseta a página para 1 quando um filtro ou pesquisa é aplicado
    setInfinite(true); // Restabelece o estado de paginação infinita
  }, [filter, search]);

  useEffect(() => {
    async function getPageProjects() {
      setLoading(true);
      const actionData = await projectsGet(search, filter, page, 9);
      if (actionData && actionData.data !== null) {
        const { data } = actionData;

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

        if (data.length < 9) setInfinite(false);
      }
      setLoading(false);
    }
    getPageProjects();
  }, [filter, page, search]);

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

  return (
    <div>
      <Projects project={data} />
      <div className="h-5" />
      <div className="text-center">
        {infinite ? (
          loading && <Loading />
        ) : (
          <p className="mx-5 text-white">Não existem mais postagens.</p>
        )}
      </div>
    </div>
  );
}
