"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import projectsGet, { Project } from "@/actions/projects-get";
import Projects from "@/components/demand/projects";

export default function Demand() {
  const [data, setData] = useState<Project[] | null>(null);
  const search = useSearchParams().get("search");
  const filter = useSearchParams().get("filter");

  useEffect(() => {
    async function getProjects() {
      const { data } = await projectsGet(search, filter);
      setData(data);
    }

    getProjects();
  }, [search, filter]);

  if (!data) return null;

  return (
    <Suspense>
      <Projects project={data} />
    </Suspense>
  );
}
