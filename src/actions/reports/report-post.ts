"use server";

import { REPORT_POST } from "@/functions/api/reports/reports-api";
import { cookies } from "next/headers";
import apiError from "@/functions/api-error";

interface ReportCreate {
  comment: string;
  projectId: string;
}

export default async function reportPost({ comment, projectId }: ReportCreate) {
  try {
    if (!comment) throw new Error("Preencha o campo.");
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const controller = new AbortController();
    const signal = controller.signal;

    const { URL } = REPORT_POST(projectId);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
      signal,
    });
    if (!response.ok) throw new Error("Erro ao reportar.");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
