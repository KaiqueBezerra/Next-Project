"use server";

import { FAVORITES_BY_USER_GET } from "@/functions/api/favorites/favorites-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export default async function favoritesByUserGet(projectId: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = FAVORITES_BY_USER_GET(projectId);

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      signal,
    });

    const data = (await response.json()) as boolean;
    if (!response.ok) throw new Error("Usuário não autenticado.");

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
