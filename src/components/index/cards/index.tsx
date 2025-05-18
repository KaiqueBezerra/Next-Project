import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/forms/button";

export function Cards() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center p-10 gap-10 md:gap-24 flex-wrap text-white px-5 lg:px-28">
        <div
          className="flex flex-col border-10 border-double border-zinc-900
        bg-zinc-700 md:h-[420px] xl:h-[340px] shadow-[0px_0px_50px_0px_black]"
        >
          <div className="flex flex-col p-5 h-full">
            <div>
              <h1 className="text-center mb-2.5 text-amber-500 font-bold font-serif text-2xl">
                Como Funciona
              </h1>
              <p className="text-justify text-lg max-md:mb-2">
                Nossa plataforma permite que você crie pedidos de ajuda ou
                encontre projetos que precisam do seu apoio. Com filtros
                intuitivos, você pode se conectar com iniciativas alinhadas aos
                seus interesses.
              </p>
            </div>

            <Link href="/demand" className="mt-auto">
              <Button>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="flex flex-col border-10 border-double border-zinc-900
        bg-zinc-700 md:h-[420px] xl:h-[340px] shadow-[0px_0px_50px_0px_black]"
        >
          <div className="flex flex-col p-5 h-full">
            <div>
              <h1 className="text-center mb-2.5 text-amber-500 font-bold font-serif text-2xl">
                Crie um pedido
              </h1>
              <p className="text-justify text-lg max-md:mb-2">
                Tem um projeto incrível e precisa de apoio? Publique seu pedido
                de ajuda e conecte-se com pessoas dispostas a contribuir.
                Descreva sua necessidade, defina objetivos e encontre
                colaboradores para transformar sua ideia em realidade!
              </p>
            </div>

            <Link href="/me" className="mt-auto">
              <Button>
                Criar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="flex flex-col border-10 border-double border-zinc-900
        bg-zinc-700 md:h-[300px] xl:h-[220px] shadow-[0px_0px_50px_0px_black]"
        >
          <div className="flex flex-col p-5 h-full">
            <div>
              <h1 className="text-center mb-2.5 text-amber-500 font-bold font-serif text-2xl">
                Nossa Missão
              </h1>
              <p className="text-justify text-lg">
                Nosso objetivo é conectar pessoas e projetos que precisam de
                apoio. Através da colaboração, ajudamos a transformar ideias em
                realidade, criando um impacto positivo na sociedade.
              </p>
            </div>

            {/* <Link href="/demand" className={styles.button}>
              <Button>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link> */}
          </div>
        </div>

        <div
          className="flex flex-col border-10 border-double border-zinc-900
        bg-zinc-700 md:h-[300px] xl:h-[220px] shadow-[0px_0px_50px_0px_black]"
        >
          <div className="flex flex-col p-5 h-full">
            <div>
              <h1 className="text-center mb-2.5 text-amber-500 font-bold font-serif text-2xl">
                Nossa Comunidade
              </h1>
              <p className="text-justify text-lg">
                Valorizamos a colaboração e acreditamos que juntos podemos criar
                soluções inovadoras. Nossa comunidade é formada por pessoas
                dispostas a ajudar e fazer a diferença.
              </p>
            </div>

            {/* <Link href="/demand" className={styles.button}>
              <Button>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
