"use client";

import { useRouter } from "next/navigation";
import { Button } from "../forms/button";
import styles from "./index.module.css";
import { ArrowBigRight } from "lucide-react";

export function Search() {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <div>
        <h1>Projetos</h1>
        <p>Encontre o projeto ideal para você</p>
      </div>

      <div className={styles.button}>
        <Button onClick={() => router.push(`/demand`)}>
          Pesquisar <ArrowBigRight style={{ marginLeft: "10px" }} />
        </Button>
      </div>
    </section>
  );
}
