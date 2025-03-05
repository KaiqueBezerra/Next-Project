"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";
import styles from "./index.module.css";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  // async function handleLogout() {
  //   await logout();
  //   window.location.href = "/sign-in";
  // }

  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        style={{
          display: pathname.startsWith("/sign-in") ? "none" : "flex",
        }}
      >
        <div>
          <Link href="/">
            <h1 className={pathname === "/" ? styles.iconActive : styles.icon}>
              Next Project
            </h1>
            {/* <HomeIcon
              className={pathname === "/" ? styles.iconActive : styles.icon}
            /> */}
          </Link>
        </div>

        <div>
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
              {user.email}
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className={
                pathname === "/sign-in" ? styles.linkActive : styles.link
              }
            >
              Criar / Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
