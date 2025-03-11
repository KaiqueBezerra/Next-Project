"use server";

import { PROJECT_GET } from "@/functions/api";
import { Project } from "./projects-get";
import apiError from "@/functions/api-error";

export default async function projectGet(id: string) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECT_GET(id);

    const response = await fetch(URL, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["projects"],
      },
      signal,
    });
    if (!response.ok) throw new Error("Erro ao pegar o projetos.");
    const data = (await response.json()) as Project;
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
