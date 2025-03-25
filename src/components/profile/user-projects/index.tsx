"use client";

import { useEffect, useRef, useState } from "react";
import { Projects } from "@/components/projects";
import { Project } from "@/actions/projects/project-by-user-get";

import projectsByUserNoTokenGet from "@/actions/projects/projects-by-user-no-token-get";
import Loading from "@/app/loading";
import styles from "./index.module.css";

import { notFound } from "next/navigation";
import { useUser } from "@/context/userContext";

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
      const actionData = await projectsByUserNoTokenGet(page, 4, userId);
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
    <div className={styles.container}>
      {data.length > 0 ? (
        <Projects project={data} />
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Este usuário ainda não criou nenhum projeto.</h3>
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
