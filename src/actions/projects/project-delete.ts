"use server";

import { PROJECT_DELETE } from "@/functions/api/projects/projects-api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

export default async function projectDelete(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = PROJECT_DELETE(id);

    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      signal,
    });
    if (!response.ok) throw new Error("Erro ao deletar projeto.");
    revalidateTag("projects");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
