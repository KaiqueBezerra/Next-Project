import { FavoritesByUserGet } from "@/actions/favorites/favorites-by-user-get";
import styles from "./index.module.css";

import Link from "next/link";

export function Favorite({ favorite }: { favorite: FavoritesByUserGet }) {
  return (
    <div key={favorite.id} className={styles.favorite}>
      <div>
        <h3>{favorite.Project.name}</h3>
        <p>{favorite.Project.description}</p>
      </div>

      <div className={styles.link}>
        <Link href={`/me/${favorite.Project.id}`}>Ver mais</Link>
      </div>
    </div>
  );
}
