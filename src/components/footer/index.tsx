"use client";

import { LinkedinIcon, MailIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className="flex flex-col text-white shadow-2xl bg-zinc-800"
      style={{ display: pathname.startsWith("/sign-in") ? "none" : "flex" }}
    >
      <div className="flex flex-col justify-center md:grid md:grid-cols-3 p-5 gap-2">
        <div className="max-md:text-center md:text-balance">
          <Link href="/">
            <h1
              className="text-xl font-bold hover:text-amber-500"
              style={{
                color: pathname === "/" ? "#FE9A00" : "",
              }}
            >
              Next Project
            </h1>
          </Link>
          <p>
            Nosso site é uma plataforma colaborativa que conecta pessoas com
            projetos que precisam de apoio.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold">Recursos</h3>
          <Link
            className="hover:text-amber-500"
            href="/me"
            style={{
              color: pathname === "/me" ? "#FE9A00" : "",
            }}
          >
            Perfil
          </Link>
        </div>

        <div className="flex flex-col md:items-end">
          <h3 className="text-lg font-bold text-center">Contatos</h3>
          <Link
            href="mailto:kaiquebezerra230@gmail.com"
            className="flex gap-1 justify-center"
          >
            <MailIcon className="text-red-500" fill="#fff" />
            <p className="hover:text-amber-500">Email</p>
          </Link>
          <Link
            href="https://www.linkedin.com/in/kaique-bezerra-souza/"
            className="flex gap-1 justify-center"
            target="_blank"
          >
            <LinkedinIcon className="text-[#0A66C2]" fill="#Fff" />
            <p className="hover:text-amber-500">LinkedIn</p>
          </Link>
        </div>
      </div>

      <div className="px-5 mb-5">
        <hr />
        <p className="mt-2.5">© 2025 - Kaique Bezerra de Souza</p>
      </div>
    </footer>
  );
}
