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
              <h1>Crie um pedido</h1>
              <p>
                Tem um projeto incrível e precisa de apoio? Publique seu pedido
                de ajuda e conecte-se com pessoas dispostas a contribuir.
                Descreva sua necessidade, defina objetivos e encontre
                colaboradores para transformar sua ideia em realidade!
              </p>
            </div>

            <Link href="/" className={styles.button}>
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
              <h1>Procure o projeto ideal para você</h1>
              <p>
                Quer fazer a diferença? Explore projetos que precisam da sua
                ajuda! Filtre por categorias, habilidades ou localização e
                encontre iniciativas alinhadas com seus interesses. Seu apoio
                pode ser a peça-chave para o sucesso de um grande projeto!
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
              <h1>Sobre nós</h1>
              <p>
                Somos uma plataforma dedicada a conectar pessoas e projetos que
                precisam de apoio. Acreditamos no poder da colaboração para
                impulsionar ideias e criar impacto positivo. Saiba mais sobre
                nossa missão e como você pode fazer parte dessa comunidade!
              </p>
            </div>

            <Link href="/about" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Ver mais
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
