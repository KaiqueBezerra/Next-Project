"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { SearchIcon } from "lucide-react";
import styles from "./index.module.css";

export function SearchForm({
  handleSubmit,
  search,
  setSearch,
}: {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Procurar"
          className={styles.glassInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className={styles.icon}>
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}
