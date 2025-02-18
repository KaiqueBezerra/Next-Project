import type { Metadata } from "next";
import styles from "./layout.module.css";
import Aside from "@/components/demand/aside";

export const metadata: Metadata = {
  title: "Next Project | Projetos",
  description: "Encontre o projeto ideal para você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.demand}>
      <Aside />
      <section className={styles.demands}>{children}</section>
    </div>
  );
}
