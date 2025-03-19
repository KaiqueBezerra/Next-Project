"use server";

import { USER_DELETE } from "@/functions/api/users/users-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export default async function userDelete() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
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
