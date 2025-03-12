"use server";

import { FAVORITE_POST } from "@/functions/api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export interface Favorite {
  id: string;
  userId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export default async function favoritePost(projectId: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = FAVORITE_POST();

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
      signal,
    });
    if (!response.ok) throw new Error("Usuário não autenticado.");

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
