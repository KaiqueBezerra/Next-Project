import { DemandModal } from "@/components/projects/modal/demand-modal";
import { notFound } from "next/navigation";
import projectGet from "@/actions/projects/project-get";
import styles from "./page.module.css";

interface ModalProps {
  params: Promise<{ id: string }>;
}

export default async function Modal({ params }: ModalProps) {
  const { id } = await params;

  const { data } = await projectGet(id);

  if (!data) return notFound();

  return (
    <div className={styles.projects}>
      <div className={styles.title}></div>
      <DemandModal data={data} />
    </div>
  );
}
