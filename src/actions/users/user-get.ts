"use server";

import { USER_GET } from "@/functions/api/users/users-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default async function userGet() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = USER_GET();

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
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
