"use client";

import { ChangeEvent } from "react";

import styles from "./index.module.css";

export function Filters({
  selectedFilter,
  handleCheckboxChange,
}: {
  selectedFilter: string | null;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.filters}>
      <h2>Filtros de Tempo</h2>

      <label htmlFor="hour">
        <input
          type="checkbox"
          value="1h"
          checked={selectedFilter === "1h"}
          onChange={handleCheckboxChange}
        />
        {""} Até 1 hora
      </label>

      <label htmlFor="day">
        <input
          type="checkbox"
          value="1d"
          checked={selectedFilter === "1d"}
          onChange={handleCheckboxChange}
        />
        {""} Até 1 dia
      </label>

      <label htmlFor="week">
        <input
          type="checkbox"
          value="1w"
          checked={selectedFilter === "1w"}
          onChange={handleCheckboxChange}
        />
        {""} Até 1 semana
      </label>
    </div>
  );
}
