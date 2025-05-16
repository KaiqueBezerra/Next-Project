"use server";

import { cookies } from "next/headers";

import { list, del } from "@vercel/blob";

import { USER_DELETE } from "@/functions/api/users/users-api";
import apiError from "@/functions/api-error";

export default async function userDelete(userId: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    if (!userId) throw new Error("ID do usuário não encontrado.");

    // 🔥 Apaga a imagem do usuário (se houver)
    const { blobs } = await list({ prefix: userId });

    for (const blob of blobs) {
      await del(blob.url);
    }

    // 🔒 Deleta o usuário na API
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = USER_DELETE();

    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      signal,
    });

    if (!response.ok) throw new Error("Erro ao deletar usuário.");

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
