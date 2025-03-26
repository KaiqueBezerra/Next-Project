import { CreateModal } from "@/components/me/profile/create-modal";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Project | Criar",
};

export default function CreateProject() {
  return <CreateModal />;
}
