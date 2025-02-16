"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/forms/button";
import styles from "./index.module.css";
export default function Aside() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(`/demand?search=${search}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Procurar"
          className={styles.glassInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button>Pesquisar</Button>
      </form>
    </>
  );
}
