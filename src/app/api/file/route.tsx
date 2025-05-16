import { NextResponse } from "next/server";

import { put, del } from "@vercel/blob";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;
  const userId = form.get("userId") as string;
  const url = form.get("url") as string;

  if (!file || !userId) {
    return NextResponse.json({ error: "File not found" }, { status: 400 });
  }

  // Renomear o arquivo para incluir o userId
  const newFileName = `${userId}-${file.name}`;


  if (url) {
    await del(url);
  }

  const blob = await put(newFileName, file, {
    access: "public",
  });

  return Response.json(blob);
}
