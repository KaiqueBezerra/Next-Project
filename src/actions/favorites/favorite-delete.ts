"use server";

import { FAVORITE_DELETE } from "@/functions/api/favorites/favorites-api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export default async function favoriteDelete(projectId: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = FAVORITE_DELETE(projectId);

    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      signal,
    });
    if (!response.ok) throw new Error("Usuário não autenticado.");
    revalidateTag("favorites");

    return { data: false, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
