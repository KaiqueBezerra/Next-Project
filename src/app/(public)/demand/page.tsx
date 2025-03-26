import type { Metadata } from "next";

import Demands from "@/components/demand/demands";
import styles from "./page.module.css";
import Aside from "@/components/demand/aside";

export const metadata: Metadata = {
  title: "Next Project | Pedidos",
};

export default function Demand() {
  return (
    <div className={styles.demand}>
      <Aside />
      <section className={styles.demands}>
        <Demands />
      </section>
    </div>
  );
}
