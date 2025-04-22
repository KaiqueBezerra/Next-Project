"use client";

import { ChangeEvent } from "react";

export function Filters({
  selectedFilter,
  handleCheckboxChange,
}: {
  selectedFilter: string | null;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className="hidden flex-col mt-8 border-5 border-double
    border-zinc-900 bg-zinc-700 text-white md:flex"
    >
      <h2 className="text-amber-500 text-lg font-bold font-serif m-2.5">
        Filtros de Tempo
      </h2>
      <label htmlFor="hour" className="flex items-center text-md p-2.5 gap-1.5">
        <input
          type="checkbox"
          value="1h"
          checked={selectedFilter === "1h"}
          onChange={handleCheckboxChange}
          className="cursor-pointer size-4 hover:opacity-75"
        />
        {""} Até 1 hora
      </label>

      <label htmlFor="day" className="flex items-center text-md p-2.5 gap-1.5">
        <input
          type="checkbox"
          value="1d"
          checked={selectedFilter === "1d"}
          onChange={handleCheckboxChange}
          className="cursor-pointer size-4 hover:opacity-75"
        />
        {""} Até 1 dia
      </label>

      <label htmlFor="week" className="flex items-center text-md p-2.5 gap-1.5">
        <input
          type="checkbox"
          value="1w"
          checked={selectedFilter === "1w"}
          onChange={handleCheckboxChange}
          className="cursor-pointer size-4 hover:opacity-75"
        />
        {""} Até 1 semana
      </label>
    </div>
  );
}
