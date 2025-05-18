import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemandModal } from "@/components/projects/modal/demand-modal";

import projectGet from "@/actions/projects/project-get";

export const metadata: Metadata = {
  title: "Next Project | Pedido",
};

interface ModalParams {
  params: Promise<{ id: string }>;
}

export default async function Modal({ params }: ModalParams) {
  const { id } = await params;

  const { data } = await projectGet(id);

  if (!data) return notFound();

  return <DemandModal data={data} />;
}
