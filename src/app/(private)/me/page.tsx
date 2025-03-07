import { MeProjects } from "@/components/me/me-projects";
import { Profile } from "@/components/me/profile";
import styles from "./page.module.css";

export default function Me() {
  return (
    <section className={styles.me}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <Profile />
          <MeProjects />
        </div>
      </div>
    </section>
  );
}
