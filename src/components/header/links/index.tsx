"use client";

import { User } from "@/actions/users/user-get";

import Link from "next/link";

interface LinksProps {
  pathname: string;
  user: User | null;
}

export function Links({ pathname, user }: LinksProps) {
  return (
    <div className="flex gap-5 max-md:hidden">
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
