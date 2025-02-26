import styles from "./index.module.css";

interface FiltersModalProps {
  selectedFilter: string | null;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FiltersModal({
  selectedFilter,
  handleCheckboxChange,
}: FiltersModalProps) {
  return (
    <div
      className={styles.filters}
      style={{
        position: "absolute",
        top: 152,
        right: 5,
        border: "1px solid black",
      }}
    >
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
