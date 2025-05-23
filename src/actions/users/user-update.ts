"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { USER_UPDATE } from "@/functions/api/users/users-api";
import apiError from "@/functions/api-error";
import { userRegex } from "@/functions/regex/user-regex/user-regex";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default async function userUpdate(
  state: {
    data: string | null;
    ok: boolean;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string | null;

  try {
    if (!name) throw new Error("Preencha os dados.");

    if (!userRegex.userNameRegex(name)) {
      throw new Error("O nome deve conter apenas letras.");
    }

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
    return { data: name, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
