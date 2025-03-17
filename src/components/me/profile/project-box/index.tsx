"use client";

import { CreateModal } from "../create-modal";
import { useState } from "react";
import styles from "./index.module.css";

export function ProjectBox() {
  const [modal, setModal] = useState(false);

  function onCloseOpen() {
    setModal(!modal);
  }

  return (
    <div className={styles.profileBox}>
      <div className={styles.projectBox}>
        <div className={styles.btn} onClick={onCloseOpen}>
          Criar projeto
        </div>
      </div>

      {modal && <CreateModal onCloseOpen={onCloseOpen} />}
    </div>
  );
}
