"use client";

import { ArrowBigRight } from "lucide-react";
import { Button } from "../../forms/button";

import { useRouter } from "next/navigation";

import styles from "./index.module.css";

export function Search() {
  const router = useRouter();

  return (
    <section className={styles.search}>
      <div className={styles.container}>
        <div>
          <h1>Encontre projetos</h1>
          <p>
            Encontre a oportunitade ideal para você. <br /> alavanque a sua
            carreira!{" "}
          </p>
        </div>

        {/* <div className={styles.button}> */}
        <Button
          onClick={() => router.push(`/demand`)}
          style={{ fontSize: "20px" }}
        >
          Pesquisar{" "}
          <ArrowBigRight
            style={{ marginLeft: "10px", height: "30px", width: "30px" }}
          />
        </Button>
        {/* </div> */}
      </div>
    </section>
  );
}
