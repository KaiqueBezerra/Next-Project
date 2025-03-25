import { DemandModal } from "@/components/projects/modal/demand-modal";
import { notFound } from "next/navigation";
import projectGet from "@/actions/projects/project-get";

interface ModalParams {
  params: Promise<{ id: string }>;
}

export default async function Modal({ params }: ModalParams) {
  const { id } = await params;

  const { data } = await projectGet(id);

  if (!data) return notFound();

  return <DemandModal data={data} />;
}
