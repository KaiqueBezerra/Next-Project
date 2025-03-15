"use server";

import { PROJECTS_BY_USER_GET } from "@/functions/api/projects/projects-api";
import { cookies } from "next/headers";
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

export default async function projectsByUserGet() {
  try {
    const token = (await cookies()).get("token")?.value;
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECTS_BY_USER_GET();

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
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
