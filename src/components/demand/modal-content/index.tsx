import { Project } from "@/actions/projects-get";
import styles from "./index.module.css";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

export default function DemandModalContent({ data }: { data: Project }) {
  const time = data.createdAt;

  const parsedDate = parseISO(time);

  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
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
  );
}
