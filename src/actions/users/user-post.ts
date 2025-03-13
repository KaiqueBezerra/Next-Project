"use server";

import { USER_POST } from "@/functions/api/users/users-api";
import apiError from "@/functions/api-error";

export default async function userPost(
  state: {
    data: null;
    ok: boolean;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!name || !email || !password) throw new Error("Preencha os dados.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = USER_POST();

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      signal,
    });
    if (!response.ok) throw new Error("Senha ou usuário inválidos.");

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
