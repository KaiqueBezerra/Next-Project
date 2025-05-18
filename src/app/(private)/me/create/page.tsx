import { Metadata } from "next";

import { CreateModal } from "@/components/me/profile/create-modal";

export const metadata: Metadata = {
  title: "Next Project | Criar",
};

export default function CreateProject() {
  return <CreateModal />;
}
