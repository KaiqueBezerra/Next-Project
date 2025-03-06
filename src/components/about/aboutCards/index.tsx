import { ArrowRight } from "lucide-react";
import { Button } from "@/components/forms/button";
import styles from "./index.module.css";
import Link from "next/link";

export function AboutCards() {
  return (
    <div className={styles.cards}>
      <div className={styles.container}>
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

            <Link href="/" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Saiba mais
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>
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
                Descubra
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
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

            <Link href="/about" className={styles.button}>
              <Button style={{ width: "100%" }}>
                Junte-se a nós
                <ArrowRight style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>
        {/* <div className={styles.card}>
            <div className={styles.content}>
              <div>
                <h1>Impacto Real</h1>
                <p>
                  Já ajudamos diversos projetos a ganharem vida com o suporte de
                  nossa comunidade. Venha fazer parte dessa rede de colaboração e
                  contribua para um mundo melhor!
                </p>
              </div>
  
              <Link href="/about" className={styles.button}>
                <Button style={{ width: "100%" }}>
                  Ver histórias
                  <ArrowRight style={{ marginLeft: "10px" }} />
                </Button>
              </Link>
            </div>
          </div> */}
      </div>
    </div>
  );
}
