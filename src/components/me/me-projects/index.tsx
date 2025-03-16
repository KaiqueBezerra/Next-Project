import { ProjectExamples } from "./project-exxamples";
import { Projects } from "@/components/projects";
import { notFound } from "next/navigation";
import projectsByUserGet from "@/actions/projects/project-by-user-get";
import styles from "./index.module.css";

export async function MeProjects() {
  const { data } = await projectsByUserGet();

  if (!data) return notFound();
  return (
    <div className={styles.projects}>
      {data.length > 0 ? (
        <Projects project={data} />
      ) : (
        <div>
          <div className={styles.noProjects}>
            <h1>Nenhum Projeto Criado</h1>

            <h3>Seu projeto ficaria assim</h3>
          </div>

          <div className={styles.container}>
            <ProjectExamples />
          </div>
        </div>
      )}
    </div>
  );
}
