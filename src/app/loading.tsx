import { Loader2 } from "lucide-react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Loader2 className={styles.loadingSpinner} />
    </div>
  );
}
