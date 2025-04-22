import type { Metadata } from "next";

import Demands from "@/components/demand/demands";
import Aside from "@/components/demand/aside";

export const metadata: Metadata = {
  title: "Next Project | Pedidos",
};

export default function Demand() {
  return (
    <div className="grid grid-cols-1 min-h-screen md:grid-cols-[1fr_6fr]">
      <Aside />
      <section className="pt-14 max-md:max-w-full">
        <Demands />
      </section>
    </div>
  );
}
