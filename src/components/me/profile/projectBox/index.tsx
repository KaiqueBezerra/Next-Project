"use client";

import { useState } from "react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import styles from "./index.module.css";

export function ProjectBox() {
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.profileBox}>
      <div className={styles.projectBox}>
        <div className={styles.btn} onClick={() => setModal(!modal)}>
          Criar projeto
        </div>
      </div>

      {modal && (
        <form className={styles.modal}>
          <Input name="name" placeholder="Nome do projeto" />

          <textarea
            name="description"
            className={styles.textArea}
            placeholder="Descrição do projeto"
          />

          <Input name="phoneNumber" placeholder="Número para contato" />

          <Button style={{ width: "100%" }}>Criar</Button>
        </form>
      )}
    </div>
  );
}
