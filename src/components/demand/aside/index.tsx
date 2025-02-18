"use client";

import { FormEvent, useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

export default function Aside() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    if (search) {
      url.searchParams.set("search", search);
    } else {
      url.searchParams.delete("search"); // Remove o search se não houver valor
    }

    if (selectedFilter) {
      url.searchParams.set("filter", selectedFilter);
    } else {
      url.searchParams.delete("filter"); // Remove o filtro se não houver
    }

    router.push(url.toString());
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedFilter(value);
    } else {
      setSelectedFilter(null);
    }
  };

  useEffect(() => {
    if (selectedFilter === null) {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.delete("filter"); // Remove o filtro da URL
      router.push(url.toString()); // Atualiza a URL
    } else {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.set("filter", selectedFilter); // Adiciona o filtro à URL
      router.push(url.toString()); // Atualiza a URL
    }
  }, [selectedFilter, router]);

  useEffect(() => {
    // Limpa os parâmetros da URL quando a página for recarregada
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    // Remove os parâmetros da URL
    url.searchParams.delete("search");
    url.searchParams.delete("filter");

    // Atualiza a URL sem os parâmetros
    router.push(url.toString());
  }, []);

  return (
    <aside className={styles.aside}>
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

      <div className={styles.filters}>
        <label htmlFor="hour">
          <input
            type="checkbox"
            value="1h"
            checked={selectedFilter === "1h"}
            onChange={handleCheckboxChange}
          />
          {""} Até 1 hora atrás
        </label>

        <label htmlFor="day">
          <input
            type="checkbox"
            value="1d"
            checked={selectedFilter === "1d"}
            onChange={handleCheckboxChange}
          />
          {""} Até 1 dia atrás
        </label>

        <label htmlFor="week">
          <input
            type="checkbox"
            value="1w"
            checked={selectedFilter === "1w"}
            onChange={handleCheckboxChange}
          />
          {""} Até 1 semana atrás
        </label>
      </div>
    </aside>
  );
}
