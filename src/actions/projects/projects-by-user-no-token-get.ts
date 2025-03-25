"use server";

import apiError from "@/functions/api-error";
import { PROJECTS_BY_USER_NO_TOKEN_GET } from "@/functions/api/projects/projects-api";

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

export default async function projectsByUserNoTokenGet(
  page: number = 1,
  limit: number = 18,
  userId: string
) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECTS_BY_USER_NO_TOKEN_GET(page, limit, userId);

    const response = await fetch(URL, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["projects"],
      },
      signal,
    });

    if (!response.ok) throw new Error("Erro ao pegar os projetos.");
    const data = (await response.json()) as Project[];

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
