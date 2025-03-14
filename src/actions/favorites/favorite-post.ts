"use server";

import { FAVORITE_POST } from "@/functions/api/favorites/favorites-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";

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

    const { URL } = FAVORITE_POST(projectId);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      signal,
    });
    if (!response.ok) throw new Error("Usuário não autenticado.");
    revalidateTag("favorites");

    return { data: true, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
