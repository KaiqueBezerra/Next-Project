import { Button } from "@/components/forms/button";

import Link from "next/link";

export function ProjectBox() {
  return (
    <div
      className="flex border-5 border-double border-zinc-900 p-5 w-[380px]
    bg-zinc-800 text-white shadow-2xl max-[390px]:w-[320px] sm:w-[360px]"
    >
      <Link href="/me/create" className="w-full">
        <Button>Criar projeto</Button>
      </Link>
    </div>
  );
}
