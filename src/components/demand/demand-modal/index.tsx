"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { Project } from "@/actions/projects-get";
import { ptBR } from "date-fns/locale";
import styles from "./index.module.css";
import Link from "next/link";

export function DemandModal({ data }: { data: Project }) {
  const parsedDate = parseISO(data.createdAt);

  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) window.location.href = "/demand";
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>{data.name}</h1>
        </div>
        <p style={{ margin: "10px 0" }}>{relativeTime}</p>
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
        <div className={styles.requirements}>
          {data.requirements.map((requirement) => (
            <p key={requirement}>{requirement}</p>
          ))}
        </div>
        <div className={styles.link}>
          <Link href={`https://wa.me/55${data.phoneNumber}`} target="_blank">
            Estou interessado
          </Link>
        </div>
      </div>
    </div>
  );
}
