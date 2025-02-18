"use server";

import { PROJECTS_GET } from "@/functions/api";
import apiError from "@/functions/api-error";

export interface Project {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default async function projectsGet(
  search: string | null,
  filter: string | null
) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!search) search = "";
    if (!filter) filter = "";

    const { URL } = PROJECTS_GET(search, filter);

    const response = await fetch(URL, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["projects"],
      },
      signal,
    });
    if (!response.ok) throw new Error("Erro ao pegar o projetos.");
    const data = (await response.json()) as Project[];
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
