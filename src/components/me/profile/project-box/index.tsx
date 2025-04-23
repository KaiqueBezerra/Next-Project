import { Button } from "@/components/forms/button";

import Link from "next/link";

export function ProjectBox() {
  return (
    <div
      className="flex border-5 border-double border-zinc-900 p-5
    bg-zinc-800 text-white shadow-2xl w-[320px] lg:w-96"
    >
      <Link href="/me/create" className="w-full">
        <Button>Criar projeto</Button>
      </Link>
    </div>
  );
}
