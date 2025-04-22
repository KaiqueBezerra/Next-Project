"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import { SearchIcon } from "lucide-react";

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
          <button
            disabled={pending}
            className="flex items-center justify-center text-white bg-amber-500
            w-12 h-full cursor-wait opacity-55"
          >
            <SearchIcon />
          </button>
        ) : (
          <button
            className="flex items-center justify-center text-white bg-amber-500
            w-12 h-full cursor-pointer hover:opacity-75"
          >
            <SearchIcon />
          </button>
        )}
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex border-5 border-double border-zinc-900 
        h-12 w-[310px] sm:w-[384px] md:w-2xs bg-zinc-700 text-white"
      >
        <input
          type="text"
          placeholder="Procurar"
          className="bg-zinc-700 w-full h-full p-2 outline-none"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FormButton />
      </div>
    </form>
  );
}
