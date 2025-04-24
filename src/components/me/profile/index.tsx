"use client";

import { useActionState, useEffect, useState } from "react";
import { Camera, Edit, LogOut } from "lucide-react";
import { ListBlobResult } from "@vercel/blob";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { ProjectBox } from "./project-box";
import { Favorite } from "./favorite";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import favoritesByUserGet, {
  FavoritesByUserGet,
} from "@/actions/favorites/favorites-by-user-get";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import userDelete from "@/actions/users/user-delete";
import userUpdate from "@/actions/users/user-update";
import logout from "@/actions/users/logout";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Salvando...</Button>
      ) : (
        <Button>Salvar</Button>
      )}
    </>
  );
}

export function Profile({ userPhoto }: { userPhoto: ListBlobResult }) {
  const [state, action] = useActionState(userUpdate, {
    ok: false,
    error: "",
    data: null,
  });

  const [favorites, setFavorites] = useState<FavoritesByUserGet[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [modal, setModal] = useState(false);

  const { user } = useUser();

  const pathname = usePathname();

  useEffect(() => {
    if (state.ok) window.location.reload();
  }, [state.ok]);

  useEffect(() => {
    async function getFavorites() {
      const { data } = await favoritesByUserGet();
      setFavorites(data);
    }

    getFavorites();
  }, []);

  async function handleLogout() {
    await logout();
    window.location.href = "/sign-in";
  }

  async function handleDelete() {
    const deleteVerify = confirm(
      "Tem Certeza que deseja deletar sua conta? Se deletar não conseguirá recuperá-la!"
    );

    if (deleteVerify) {
      const deleteVerifyAgain = confirm(
        "Tem Certeza Absoluta que deseja deletar sua conta?"
      );

      if (deleteVerifyAgain) {
        setLoading(true);

        const { ok } = await userDelete();

        if (ok) {
          handleLogout();
        }

        setLoading(false);
      }
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (file && user) {
      setLoadingPhoto(true);

      const userId = user?.id;

      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("userId", userId);
      if (userPhoto.blobs.length > 0)
        formData.append("url", userPhoto.blobs[0].url);

      const response = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      }

      setLoadingPhoto(false);
    }
  }

  const displayedFavorites = showAll ? favorites : favorites?.slice(0, 2);

  return (
    <div className="flex flex-col items-center p-5">
      <div
        className="flex border-5 border-double border-zinc-900 p-5 w-[380px]
        bg-zinc-800 text-white shadow-2xl max-[390px]:w-[320px] sm:w-[360px]"
      >
        <div className="flex items-center gap-2 break-all">
          <div className="flex items-center gap-2">
            <div>
              <label htmlFor="file">
                {userPhoto && userPhoto.blobs.length > 0 ? (
                  <Image
                    className="object-cover border-5 border-double border-zinc-900
                    size-16 cursor-pointer rounded-md"
                    alt="user"
                    src={userPhoto.blobs[0].url}
                    style={{ opacity: loadingPhoto ? 0.5 : 1 }}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Camera
                    className="object-cover border-5 border-double border-zinc-900
                    size-16 cursor-pointer rounded-md"
                  />
                )}
              </label>

              <input
                name="image"
                type="file"
                disabled={loadingPhoto}
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <h3
              className="capitalize flex-1 overflow-hidden 
              text-ellipsis line-clamp-2 text-lg font-serif"
            >
              {user?.name}
            </h3>
          </div>

          <div className="flex gap-2">
            <Edit
              onClick={() => setModal(!modal)}
              className="cursor-pointer hover:text-amber-500 transition-colors"
            />
            <LogOut
              onClick={handleLogout}
              className="cursor-pointer hover:text-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {modal && (
        <div
          className="border-5 border-double border-zinc-900 w-[380px] 
          p-5 bg-zinc-800 shadow-2xl max-[390px]:w-[320px] sm:w-[360px]"
        >
          <form action={action} className="flex flex-col gap-4">
            <Input
              name="name"
              type="text"
              placeholder="Novo nome"
              defaultValue={user?.name}
            />
            <FormButton />
          </form>

          <div className="mt-2">
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="flex justify-center items-center cursor-pointer p-3.5 font-bold text-black
              transition duration-200 border border-zinc-700 bg-red-500 hover:opacity-80
              disabled:opacity-60 disabled:cursor-wait w-full"
            >
              Excluir perfil
            </Button>
          </div>

          <div className="mt-2">
            <ErrorMessage error={state.error} />
          </div>
        </div>
      )}

      {pathname !== "/me/create" && <ProjectBox />}

      <div
        className="flex flex-col border-5 border-double border-zinc-900 p-5 w-[380px]
        bg-zinc-800 text-white shadow-2xl max-[390px]:w-[320px] sm:w-[360px]"
      >
        <h3 className="text-xl font-serif text-amber-500">Favoritos</h3>

        {favorites && favorites.length > 0 ? (
          <div className="flex flex-col gap-5 p-2.5">
            {displayedFavorites?.map((favorite) => (
              <Favorite favorite={favorite} key={favorite.id} />
            ))}

            {favorites && favorites.length > 2 && !showAll && (
              <Button onClick={() => setShowAll(true)}>Ver mais</Button>
            )}

            {showAll && favorites && favorites.length > 2 && (
              <Button onClick={() => setShowAll(false)}>Ver menos</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <p className="text-lg">Sem Projetos favoritos</p>
            </div>
            <Link href="/demand">
              <Button>Ver projetos</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
