import { FavoritesByUserGet } from "@/actions/favorites/favorites-by-user-get";

import Link from "next/link";

export function Favorite({ favorite }: { favorite: FavoritesByUserGet }) {
  return (
    <div
      key={favorite.id}
      className="flex flex-col border-5 border-double w-full
      border-zinc-900 bg-zinc-700 h-[210px] p-2.5 break-all"
    >
      <div>
        <h3
          className="capitalize overflow-hidden text-lg font-serif
          text-amber-500 text-ellipsis line-clamp-2 flex-1 mb-2.5"
        >
          {favorite.Project.name}
        </h3>
        <p
          className="capitalize overflow-hidden 
          text-ellipsis line-clamp-2 flex-1"
        >
          {favorite.Project.description}
        </p>
      </div>

      <div className="flex justify-end items-end flex-1">
        <Link
          href={`/demand/${favorite.Project.id}`}
          className="border border-zinc-800 font-bold text-black
          bg-amber-500 hover:bg-amber-800 p-2 sm:p-2.5"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
