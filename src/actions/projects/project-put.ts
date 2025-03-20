"use server";

import { revalidateTag } from "next/cache";
import { PROJECT_PUT } from "@/functions/api/projects/projects-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

interface ProjectPut {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  phoneNumber: string;
}

export default async function projectPut({
  id,
  name,
  description,
  requirements,
  phoneNumber,
}: ProjectPut) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    if (!name || !description || !phoneNumber) {
      throw new Error("Preencha todos os dados.");
    }

    const { URL } = PROJECT_PUT(id);

    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, requirements, phoneNumber }),
      signal,
    });
    if (!response.ok) throw new Error("Erro ao criar projeto.");
    revalidateTag("projects");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
