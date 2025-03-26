"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
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
  function FormButton() {
    const { pending } = useFormStatus();

    return (
      <>
        {pending ? (
          <button className={styles.disabledIcon} disabled={pending}>
            <SearchIcon />
          </button>
        ) : (
          <button className={styles.icon}>
            <SearchIcon />
          </button>
        )}
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Procurar"
          className={styles.glassInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FormButton />
      </div>
    </form>
  );
}
