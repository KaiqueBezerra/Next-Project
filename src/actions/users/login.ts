"use server";

import { cookies } from "next/headers";
import { LOGIN } from "@/functions/api";
import apiError from "@/functions/api-error";

export default async function login(
  state: {
    data: null;
    ok: boolean;
    error: string;
  },
  formData: FormData
) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!email || !password) throw new Error("Preencha os dados.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = LOGIN();

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      signal,
    });
    const data = await response.json();

    if (!response.ok) throw new Error("Senha ou usuário inválidos.");

    (await cookies()).set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
