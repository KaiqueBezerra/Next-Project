"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectExamples } from "./project-exxamples";
import { Projects } from "@/components/projects";
import { notFound } from "next/navigation";
import projectsByUserGet, {
  Project,
} from "@/actions/projects/project-by-user-get";
import Loading from "@/app/loading";
import styles from "./index.module.css";

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
    <div className={styles.projects}>
      <div className={styles.title}>
        <h1>Projetos</h1>
      </div>

      {data.length > 0 ? (
        <Projects project={data} />
      ) : (
        <div>
          <div className={styles.noProjects}>
            <h1>Nenhum Projeto Criado</h1>

            <h3>Seu projeto ficaria assim</h3>
          </div>

          <div className={styles.container}>
            <ProjectExamples />
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div style={{ textAlign: "center" }}>
          {infinite ? (
            loading && <Loading />
          ) : (
            <p style={{ margin: "30px 0px" }}>
              Não há mais projetos para carregar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
