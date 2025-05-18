import { ListBlobResult } from "@vercel/blob";
import { Smile } from "lucide-react";

import { User } from "@/actions/users/user-get";

import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";

export function UserProfile({
  user,
  userPhoto,
  projectsCount,
}: {
  user: User;
  userPhoto: ListBlobResult;
  projectsCount: number | null;
}) {
  const parsedDate = parseISO(user.createdAt);
  const relativeTime = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div
      className="flex border-5 border-double bg-zinc-800/90
    border-zinc-900 text-white p-5 gap-5 shadow-2xl
      max-md:flex-col max-md:items-center"
    >
      <div
        className="border-5 border-double
      border-zinc-900 size-52"
      >
        {userPhoto && userPhoto.blobs.length > 0 ? (
          <Image
            className="size-full object-cover"
            alt="user"
            src={userPhoto.blobs[0].url}
            width={200}
            height={200}
            priority
          />
        ) : (
          <Smile className="size-full" />
        )}
      </div>

      <div className="flex flex-col p-5 gap-2 max-md:text-center">
        <h2 className="text-2xl md:text-4xl">{user?.name}</h2>
        <p className="text-lg md:text-xl">Registrado: {relativeTime}</p>
        {projectsCount && (
          <p className="text-lg md:text-xl">
            Total de projetos: {projectsCount}
          </p>
        )}
      </div>
    </div>
  );
}
