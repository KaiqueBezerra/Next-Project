"use client";

import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";
import { useUser } from "@/context/userContext";
import styles from "./index.module.css";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  // async function handleLogout() {
  //   await logout();
  //   window.location.href = "/sign-in";
  // }

  return (
    <header>
      <nav
        className={styles.nav}
        style={{
          display: pathname.startsWith("/login") ? "none" : "flex",
        }}
      >
        <div>
          <Link href="/">
            <HomeIcon className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href="/demand" className={styles.link}>
            Pedidos
          </Link>
          <Link href="/about" className={styles.link}>
            Sobre
          </Link>
          {user ? (
            <Link href="/me" className={styles.link}>
              {user.email}
            </Link>
          ) : (
            <Link href="/sign-in" className={styles.link}>
              Criar / Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
