"use client";

import { FormEvent, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { FiltersModal } from "./filters-modal";
import { SearchForm } from "./search-form";
import { MenuIcon } from "lucide-react";
import { Filters } from "./filters";

export default function Aside() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
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
  }, [router]);

  return (
    <aside
      className="md:p-5 border-5 border-double bg-zinc-800 border-zinc-900
      max-md:flex md:h-full flex-col items-center justify-center gap-1 max-md:h-[150px]"
    >
      <SearchForm
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />

      <div
        onClick={() => setModalOpen(!modalOpen)}
        className="justify-center items-center border-5 border-double bg-zinc-700
      border-zinc-900 h-10 w-[380px]  cursor-pointer relative sm:hidden
        max-md:flex text-white max-[390px]:w-[320px] sm:w-[340px] md:w-2xs"
      >
        <MenuIcon />
        {modalOpen && (
          <FiltersModal
            selectedFilter={selectedFilter}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
      </div>

      <Filters
        selectedFilter={selectedFilter}
        handleCheckboxChange={handleCheckboxChange}
      />
    </aside>
  );
}
