"use client";

import { InstagramIcon, MailIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      <div className={styles.nextProject}>
        <Link href="/">
          <h1 className={pathname === "/" ? styles.iconActive : styles.icon}>
            Next Project
          </h1>
        </Link>
        <p>
          Nosso site é uma plataforma colaborativa que conecta pessoas com
          projetos que precisam de apoio.
        </p>
      </div>

      <div className={styles.resources}>
        <h3>Recursos</h3>
        <Link className={styles.link} href="/me">
          Perfil
        </Link>
        <Link className={styles.link} href="/about">
          Sobre nós
        </Link>
      </div>

      <div className={styles.contacts}>
        <h3>Contatos</h3>
        <Link href="mailto:kaiquebezerra230@gmail.com" className={styles.link}>
          <MailIcon className={styles.email} /> Email
        </Link>
        <Link
          href="https://www.instagram.com/bezerra_kaique/"
          className={styles.link}
        >
          <InstagramIcon className={styles.instagram} /> Instagram
        </Link>
      </div>
    </footer>
  );
}
