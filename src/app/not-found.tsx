import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundText}>Página não encontrada</p>
    </div>
  );
}
