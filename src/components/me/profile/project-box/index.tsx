import Link from "next/link";
import styles from "./index.module.css";

export function ProjectBox() {
  return (
    <div className={styles.profileBox}>
      <div className={styles.projectBox}>
        <Link href="/me/create" className={styles.btn}>
          Criar projeto
        </Link>
      </div>
    </div>
  );
}
