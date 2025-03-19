import { Profile } from "@/components/me/profile";
import styles from "./layout.module.css";

export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles.me}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <Profile />
          {children}
        </div>
      </div>
    </section>
  );
}
