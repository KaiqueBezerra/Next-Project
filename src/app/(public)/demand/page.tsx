"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Projects } from "@/components/demand/projects";
import projectsGet, { Project } from "@/actions/projects/projects-get";
import Loading from "@/app/loading";

export default function Demand() {
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
      const actionData = await projectsGet(search, filter, page, 12, {
        cache: "no-store",
      });
      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setData((currentPhotos) => [...currentPhotos, ...data]);
        if (data.length < 12) setInfinite(false);
      }
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
      <div style={{ height: "20px" }} />
      <div style={{ textAlign: "center" }}>
        {infinite ? (
          loading && <Loading />
        ) : (
          <p style={{ margin: "20px 0px" }}>Não existem mais postagens.</p>
        )}
      </div>
    </div>
  );
}
