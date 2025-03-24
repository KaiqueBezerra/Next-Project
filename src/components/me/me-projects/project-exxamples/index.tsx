import styles from "./index.module.css";

export function ProjectExamples() {
  return (
    <>
      <div className={styles.project}>
        <div className={styles.header}>
          <h1>Nome do projeto.</h1>
          <p className={styles.time}>Publicado: há cerca de 6 horas</p>
          <div className={styles.description}>
            <p>Essa seria a descrição do projeto.</p>
            <div className={styles.requirements}>
              <div className={styles.requirement}>
                <p>Requisito 1</p>
                <p>Requisito 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <p>Ver mais</p>
        </div>
      </div>

      <div className={styles.project}>
        <div className={styles.header}>
          <h1>Nome do projeto 2.</h1>
          <p className={styles.time}>Publicado: há cerca de 8 horas</p>
          <div className={styles.description}>
            <p>Essa seria a descrição do projeto 2.</p>
            <div className={styles.requirements}>
              <div className={styles.requirement}>
                <p>Requisito 1</p>
                <p>Requisito 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <p>Ver mais</p>
        </div>
      </div>

      {/* <div className={styles.project}>
        <div className={styles.header}>
          <h1>Nome do projeto 3.</h1>
          <p className={styles.time}>Publicado: há 5 dias </p>
          <div className={styles.description}>
            <p>Essa seria a descrição do projeto 3.</p>
            <div className={styles.requirements}>
              <div className={styles.requirement}>
                <p>Requisito 5</p>
                <p>Requisito 6</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <p>Ver mais</p>
        </div>
      </div> */}
    </>
  );
}
