"use server";

import { PROJECTS_GET } from "@/functions/api/projects/projects-api";
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
  User?: {
    name: string;
  };
}

export default async function projectsGet(
  search: string | null,
  filter: string | null,
  page: number = 1,
  limit: number = 18,
  optionsFront?: RequestInit
) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECTS_GET(search, filter, page, limit);

    const response = await fetch(URL, {
      next: { revalidate: 60, tags: ["projects"] },
      signal,
    });

    if (!response.ok) throw new Error("Erro ao pegar os projetos.");
    const data = (await response.json()) as Project[];

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
