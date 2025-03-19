"use server";

import { FAVORITES_BY_USER_GET } from "@/functions/api/favorites/favorites-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export interface FavoritesByUserGet {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  Project: {
    id: string;
    name: string;
    description: string;
  };
}

export default async function favoritesByUserGet() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = FAVORITES_BY_USER_GET();

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        tags: ["favorites"],
      },
      signal,
    });

    const data = (await response.json()) as FavoritesByUserGet[];
    if (!response.ok) throw new Error("Usuário não autenticado.");

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
