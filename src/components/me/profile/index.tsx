"use client";

import { useUser } from "@/context/userContext";
import { Edit } from "lucide-react";
import styles from "./index.module.css";

import Image from "next/image";

export function Profile() {
  const { user } = useUser();

  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Image
              className={styles.img}
              alt="user"
              src="/assets/eu.jpg"
              width={50}
              height={50}
            />

            <h3>{user?.name}</h3>
          </div>

          <div className={styles.icon}>
            <Edit />
          </div>
        </div>

        <div className={styles.bottom}></div>
      </div>

      <div className={styles.profileBox}></div>

      <div className={styles.profileBox}></div>
    </div>
  );
}
