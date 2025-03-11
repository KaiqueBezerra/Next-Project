"use client";

import { User } from "@/actions/user-get";
import styles from "./index.module.css";
import Link from "next/link";

interface LinksProps {
  pathname: string;
  user: User | null;
}

export function LinksModal({ pathname, user }: LinksProps) {
  return (
    <div className={styles.links}>
      <Link
        href="/demand"
        className={pathname === "/demand" ? styles.linkActive : styles.link}
      >
        Pedidos
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? styles.linkActive : styles.link}
      >
        Sobre
      </Link>
      {user ? (
        <Link
          href="/me"
          className={pathname === "/me" ? styles.linkActive : styles.link}
        >
          {user.name}
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
