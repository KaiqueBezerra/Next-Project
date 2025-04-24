"use client";

import { LinksModal } from "./links-modal";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { Links } from "./links";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky bg-zinc-800 top-0 z-50 shadow-2xl text-white">
      <nav
        className="flex justify-between items-center p-4 max-md:justify-around"
        style={{
          display: pathname.startsWith("/sign-in") ? "none" : "flex",
        }}
      >
        <div>
          <Link href="/">
            <h1
              className="text-xl font-bold hover:text-amber-500"
              style={{
                color: pathname === "/" ? "#FE9A00" : "",
              }}
            >
              Next Project
            </h1>
          </Link>
        </div>

        <div
          className="hidden justify-center items-center border-5 border-double bg-zinc-700
          border-zinc-900 h-10 w-9 cursor-pointer relative max-md:flex shadow-2xl"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <MenuIcon />
          {modalOpen && <LinksModal pathname={pathname} user={user} />}
        </div>

        <Links pathname={pathname} user={user} />
      </nav>
    </header>
  );
}
