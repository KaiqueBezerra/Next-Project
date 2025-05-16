"use server";

import { cookies } from "next/headers";

import { LOGIN } from "@/functions/api/users/users-api";
import apiError from "@/functions/api-error";

export async function loginWithCredentials(email: string, password: string) {
  try {
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

    if (!response.ok) throw new Error("Erro ao fazer login automático.");

    (await cookies()).set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return { ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
