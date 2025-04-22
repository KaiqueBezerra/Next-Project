"use client";

import { ArrowBigRight } from "lucide-react";
import { Button } from "../../forms/button";

import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col items-center justify-center p-12
    bg-[url('/assets/home.png')] bg-cover min-h-[90vh] text-white"
    >
      <div
        className="flex flex-col bg-zinc-700 rounded-md p-5
        border-5 border-double border-zinc-900 text-center"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-serif text-amber-500">
            Encontre projetos
          </h1>
          <p className="text-xl">
            Encontre a oportunitade ideal para você. <br /> alavanque a sua
            carreira!{" "}
          </p>
        </div>

        <div className="mt-5 text-xl">
          <Button onClick={() => router.push(`/demand`)}>
            Pesquisar{" "}
            <ArrowBigRight
              style={{ marginLeft: "10px", height: "30px", width: "30px" }}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
