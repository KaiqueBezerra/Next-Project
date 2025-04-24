import { Project } from "@/actions/projects/projects-get";
import { useUser } from "@/context/userContext";

import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const { user } = useUser();

  const parsedDate = parseISO(project.createdAt);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  const parsedDateUpdatedAt = parseISO(project.updatedAt);
  const relativeTimeUpdatedAt = formatDistanceToNow(parsedDateUpdatedAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div
      className="flex flex-col gap-2 w-[380px] h-[380px] rounded-md p-5 border-10 border-double bg-zinc-700 text-white
    border-zinc-900 transition hover:translate-y-[-10] max-[390px]:h-[320px] max-[390px]:w-[320px] sm:size-[360px] 
      shadow-[0px_0px_10px_0px_black]"
    >
      <div className="break-all">
        <h1
          className="capitalize overflow-hidden text-ellipsis line-clamp-3 
          text-xl font-serif flex-1 sm:text-2xl"
          style={{
            color: user?.id === project.userId ? "#FE9A00" : "#fff",
          }}
        >
          {project.name}
        </h1>
      </div>
      <div className="text-sm italic">
        <p>Publicado: {relativeTime} </p>
        {relativeTime !== relativeTimeUpdatedAt && (
          <p>Atualizado: {relativeTimeUpdatedAt}</p>
        )}
      </div>
      <div className="break-all mt-2 sm:mt-3">
        <p
          className="text-justify overflow-hidden text-ellipsis line-clamp-3 
          text-md sm:text-lg"
        >
          {project.description}
        </p>
        <div className="flex break-all">
          <div className="overflow-hidden text-ellipsis line-clamp-1 mt-4">
            {project.requirements.map((requirement) => (
              <p
                key={requirement}
                className="bg-amber-500 border border-zinc-800
                p-2 mr-1 sm:p-2.5 inline-block font-bold text-black"
              >
                {requirement}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end flex-1">
        <Link
          href={`/demand/${project.id}`}
          className="border border-zinc-800 font-bold text-black 
          bg-amber-500 hover:bg-amber-800 p-2 sm:p-2.5"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
