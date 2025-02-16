"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import projectsGet, { Project } from "@/actions/projects-get";
import Projects from "@/components/demand/projects";

export default function Demand() {
  const [data, setData] = useState<Project[] | null>(null);
  const search = useSearchParams().get("search");

  useEffect(() => {
    async function getProjects() {
      if (search) {
        const { data } = await projectsGet(search);
        setData(data);
      } else {
        const { data } = await projectsGet();
        setData(data);
      }
    }

    getProjects();
  }, [search]);

  if (!data) return null;

  return (
    <Suspense>
      <Projects project={data} />
    </Suspense>
  );
}
