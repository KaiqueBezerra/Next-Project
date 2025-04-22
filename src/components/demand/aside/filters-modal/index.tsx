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
      className="flex flex-col border-5 border-double w-[310px]
    border-zinc-900 bg-zinc-700 text-white top-[35px]
      sm:w-[384px] md:w-2xs md:hidden absolute"
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
