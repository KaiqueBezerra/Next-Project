import { DemandModal } from "@/components/demand/demand-modal";
import { notFound } from "next/navigation";
import projectGet from "@/actions/projects/project-get";

interface ModalProps {
  params: Promise<{ id: string }>;
}

export default async function Modal({ params }: ModalProps) {
  const { id } = await params;

  const { data } = await projectGet(id);

  if (!data) return notFound();

  return <DemandModal data={data} />;
}
