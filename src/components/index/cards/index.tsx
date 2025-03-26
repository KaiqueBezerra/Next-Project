import { ArrowRight } from "lucide-react";
import { Button } from "@/components/forms/button";

import styles from "./index.module.css";

import Link from "next/link";

export function Cards() {
  return (
    <div className={styles.cards}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <h1>Como Funciona</h1>
              <p>
                Nossa plataforma permite que você crie pedidos de ajuda ou
                encontre projetos que precisam do seu apoio. Com filtros
                intuitivos, você pode se conectar com iniciativas alinhadas aos
                seus interesses.
              </p>
            </div>

            <Link href="/demand" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <h1>Crie um pedido</h1>
              <p>
                Tem um projeto incrível e precisa de apoio? Publique seu pedido
                de ajuda e conecte-se com pessoas dispostas a contribuir.
                Descreva sua necessidade, defina objetivos e encontre
                colaboradores para transformar sua ideia em realidade!
              </p>
            </div>

            <Link href="/me" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Criar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <h1>Nossa Missão</h1>
              <p>
                Nosso objetivo é conectar pessoas e projetos que precisam de
                apoio. Através da colaboração, ajudamos a transformar ideias em
                realidade, criando um impacto positivo na sociedade.
              </p>
            </div>

            {/* <Link href="/demand" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link> */}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <h1>Nossa Comunidade</h1>
              <p>
                Valorizamos a colaboração e acreditamos que juntos podemos criar
                soluções inovadoras. Nossa comunidade é formada por pessoas
                dispostas a ajudar e fazer a diferença.
              </p>
            </div>

            {/* <Link href="/demand" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Procurar
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
