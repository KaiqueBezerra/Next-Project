"use client";

import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { Links } from "./links";
import styles from "./index.module.css";
import Link from "next/link";
import { LinksModal } from "./links-modal";

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

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
          </Link>
        </div>

        <div className={styles.menu} onClick={() => setModalOpen(!modalOpen)}>
          <MenuIcon />
          {modalOpen && <LinksModal pathname={pathname} user={user} />}
        </div>

        <Links pathname={pathname} user={user} />
      </nav>
    </header>
  );
}
