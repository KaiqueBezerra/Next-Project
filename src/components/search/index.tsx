"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../forms/button";
import styles from "./index.module.css";

export default function Search() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (search) {
      router.push(`/demand?search=${search}`);
    } else {
      alert("Digite alguma coisa");
    }
  }

  return (
    <section className={styles.container}>
      <h1>Projetos</h1>
      <p>Encontre o projeto ideal para você</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Procurar"
          className={styles.glassInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button>Pesquisar</Button>
      </form>
      {/* <form action="">
        <input type="file" id="file" name="file" style={{ display: "none" }} />
        <Button type="button" style={{ marginRight: "1rem" }}>
          <label htmlFor="file">Envie sua foto</label>
        </Button>
        <Button type="submit">Upload</Button>
      </form> */}
    </section>
  );
}
