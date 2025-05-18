"use client";

import Link from "next/link";

import { User } from "@/actions/users/user-get";

interface LinksProps {
  pathname: string;
  user: User | null;
}

export function LinksModal({ pathname, user }: LinksProps) {
  return (
    <div
      className="flex flex-col items-center border-5 border-double text-white
     bg-zinc-700 border-zinc-900 w-[150px] absolute top-[35px] right-[-55px]"
    >
      <Link
        href="/demand"
        className="text-lg font-bold hover:text-amber-500"
        style={{
          color: pathname === "/demand" ? "#FE9A00" : "",
        }}
      >
        Pedidos
      </Link>

      {user ? (
        <Link
          href="/me"
          className="text-lg font-bold hover:text-amber-500"
          style={{
            color: pathname === "/me" ? "#FE9A00" : "",
          }}
        >
          Perfil
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="text-lg font-bold hover:text-amber-500"
          style={{
            color: pathname === "/sign-in" ? "#FE9A00" : "",
          }}
        >
          Criar / Entrar
        </Link>
      )}
    </div>
  );
}
