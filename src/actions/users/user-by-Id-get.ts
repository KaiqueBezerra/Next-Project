"use server";

import { USER_BY_ID_GET } from "@/functions/api/users/users-api";
import apiError from "@/functions/api-error";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default async function userByIdGet(userId: string) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = USER_BY_ID_GET(userId);

    const response = await fetch(URL, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["user"],
      },
      signal,
    });
    if (!response.ok) throw new Error("Erro ao pegar o usuário.");
    const data = (await response.json()) as User;
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
