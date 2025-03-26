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
import styles from "./index.module.css";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled={pending}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          Salvando...
        </Button>
      ) : (
        <Button style={{ width: "100%", marginBottom: "10px" }}>Salvar</Button>
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
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <div className={styles.userBox}>
          <div className={styles.user}>
            <div className={styles.imgContainer}>
              <div style={{ position: "relative" }}>
                <label htmlFor="file">
                  {userPhoto && userPhoto.blobs.length > 0 ? (
                    <Image
                      className={styles.img}
                      alt="user"
                      src={userPhoto.blobs[0].url}
                      style={{ opacity: loadingPhoto ? 0.5 : 1 }}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Camera className={styles.img} />
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

              <h3>{user?.name}</h3>
            </div>

            <div className={styles.icons}>
              <Edit className={styles.icon} onClick={() => setModal(!modal)} />
              <LogOut className={styles.icon} onClick={handleLogout} />
            </div>
          </div>

          {modal && (
            <div className={styles.modal}>
              <form action={action}>
                <Input
                  name="name"
                  type="text"
                  placeholder="Novo nome"
                  defaultValue={user?.name}
                />
                <FormButton />
              </form>

              <Button
                model="1"
                style={{ width: "100%" }}
                onClick={handleDelete}
                disabled={loading}
              >
                Excluir perfil
              </Button>

              <ErrorMessage error={state.error} />
            </div>
          )}
        </div>
      </div>

      {pathname !== "/me/create" && (
        <div>
          <ProjectBox />
        </div>
      )}

      <div className={styles.profileBox}>
        <h3>Favoritos</h3>

        {favorites && favorites.length > 0 ? (
          <div className={styles.favorites}>
            {displayedFavorites?.map((favorite) => (
              <Favorite favorite={favorite} key={favorite.id} />
            ))}

            {favorites && favorites.length > 2 && !showAll && (
              <Button
                onClick={() => setShowAll(true)}
                style={{ height: "30px" }}
              >
                Ver mais
              </Button>
            )}

            {showAll && favorites && favorites.length > 2 && (
              <Button
                onClick={() => setShowAll(false)}
                style={{ height: "30px" }}
              >
                Ver menos
              </Button>
            )}
          </div>
        ) : (
          <div className={styles.noFavoriteContainer}>
            <div>
              <p>Sem Projetos favoritos</p>
            </div>
            <div className={styles.noFavorite}>
              <Link href="/demand/">Ver projetos</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
