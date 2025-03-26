"use client";

import { User } from "@/actions/users/user-get";

import Link from "next/link";

import styles from "./index.module.css";

interface LinksProps {
  pathname: string;
  user: User | null;
}

export function Links({ pathname, user }: LinksProps) {
  return (
    <div className={styles.links}>
      <Link
        href="/demand"
        className={pathname === "/demand" ? styles.linkActive : styles.link}
      >
        Pedidos
      </Link>
      {user ? (
        <Link
          href="/me"
          className={pathname === "/me" ? styles.linkActive : styles.link}
        >
          Perfil
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className={pathname === "/sign-in" ? styles.linkActive : styles.link}
        >
          Criar / Entrar
        </Link>
      )}
    </div>
  );
}
