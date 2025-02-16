"use client";

import Search from "@/components/search";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.img}>
        <Search />
      </div>
    </div>
  );
}
