"use server";

import { PROJECTS_COUNT_BY_USER_GET } from "@/functions/api/projects/projects-api";
import apiError from "@/functions/api-error";

export default async function projectsCountByUserGet(userId: string) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECTS_COUNT_BY_USER_GET(userId);

    const response = await fetch(URL, {
      next: { revalidate: 60, tags: ["projects"] },
      signal,
    });

    if (!response.ok) throw new Error("Erro ao pegar os projetos.");
    const data = (await response.json()) as number;

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
