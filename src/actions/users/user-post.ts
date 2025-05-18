"use server";

import { loginWithCredentials } from "./login-helper";

import { USER_POST } from "@/functions/api/users/users-api";
import { userRegex } from "@/functions/regex/user-regex/user-regex";
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

    if (!userRegex.userNameRegex(name)) {
      throw new Error("O nome deve conter apenas letras.");
    }

    if (!userRegex.Password(password)) {
      throw new Error(
        "A senha deve ter no minimo 8 caracteres e ter ao menos uma letra maiúscula, uma minúscula e um caracter especial."
      );
    }

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

    if (!response.ok) throw new Error("Erro ao criar usuário.");

    // Faz login automático após o registro
    const loginResult = await loginWithCredentials(email, password);
    if (!loginResult.ok) throw new Error(loginResult.error);

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
