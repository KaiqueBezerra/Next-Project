"use server";

import { revalidateTag } from "next/cache";
import { USER_UPDATE } from "@/functions/api/users/users-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default async function userUpdate(
  state: {
    data: null;
    ok: boolean;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string | null;

  try {
    if (!name) throw new Error("Preencha os dados.");
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = USER_UPDATE();

    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      signal,
    });
    if (!response.ok) throw new Error("Erro ao atualizar o usuário.");
    revalidateTag("user");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
