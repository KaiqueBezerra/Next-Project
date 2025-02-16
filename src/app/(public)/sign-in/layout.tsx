import { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Next Project | Sign-in",
  description: "Encontre o projeto ideal para você.",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.login}>
      <div className={styles.forms}>{children}</div>
    </div>
  );
}
