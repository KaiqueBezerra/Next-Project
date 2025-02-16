"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "@/actions/projects-get";
import DemandModalContent from "@/components/demand/modal-content";
import projectGet from "@/actions/project-get";
import NotFound from "@/app/not-found";
import styles from "./page.module.css";

export default function DemandModal() {
  const [data, setData] = useState<Project | null>(null);

  const { id } = useParams() as { id: string };
  const router = useRouter();

  console.log(id);

  useEffect(() => {
    async function getProject() {
      const { data } = await projectGet(id);
      setData(data);
    }

    getProject();
  }, [id]);

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) router.back();
  }

  if (!data) return NotFound();

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <DemandModalContent data={data} />
    </div>
  );
}
