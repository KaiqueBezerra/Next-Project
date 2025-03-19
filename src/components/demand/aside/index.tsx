"use client";

import { FormEvent, useState, useEffect } from "react";
import { FiltersModal } from "./filters-modal";
import { SearchForm } from "./search-form";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Filters } from "./filters";
import styles from "./index.module.css";

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
    <div>
      <aside className={styles.aside}>
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />

        <div className={styles.menu} onClick={() => setModalOpen(!modalOpen)}>
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
    </div>
  );
}
