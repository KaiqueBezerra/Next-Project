import { ListBlobResult } from "@vercel/blob";
import { Smile } from "lucide-react";
import { User } from "@/actions/users/user-get";
import styles from "./index.module.css";

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
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {userPhoto && userPhoto.blobs.length > 0 ? (
          <Image
            className={styles.img}
            alt="user"
            src={userPhoto.blobs[0].url}
            width={200}
            height={200}
            priority
          />
        ) : (
          <Smile className={styles.icon} />
        )}
      </div>

      <div className={styles.description}>
        <h2>{user?.name}</h2>
        <p>Registrado: {relativeTime}</p>
        {projectsCount && <p>Total de projetos: {projectsCount}</p>}
      </div>
    </div>
  );
}
