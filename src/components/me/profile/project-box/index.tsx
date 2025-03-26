import styles from "./index.module.css";

import Link from "next/link";

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
