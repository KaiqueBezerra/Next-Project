"use client";

import { MouseEventHandler, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { Edit, LogOut } from "lucide-react";
import { ProjectBox } from "./project-box";
import { Favorite } from "./favorite";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import favoritesByUserGet, {
  FavoritesByUserGet,
} from "@/actions/favorites/favorites-by-user-get";
import userDelete from "@/actions/users/user-delete";
import userUpdate from "@/actions/users/user-update";
import logout from "@/actions/users/logout";
import styles from "./index.module.css";

import Image from "next/image";
import Link from "next/link";

function FormButton({
  model,
  onClick,
  text,
}: {
  model?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} style={{ width: "100%" }} model={model}>
          {text}
        </Button>
      ) : (
        <Button style={{ width: "100%" }} model={model} onClick={onClick}>
          {text}
        </Button>
      )}
    </>
  );
}

export function Profile() {
  const [state, action] = useActionState(userUpdate, {
    ok: false,
    error: "",
    data: null,
  });

  const [favorites, setFavorites] = useState<FavoritesByUserGet[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [modal, setModal] = useState(false);

  const { user } = useUser();

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
        const { ok } = await userDelete();

        if (ok) {
          handleLogout();
        }
      }
    }
  }

  const displayedFavorites = showAll ? favorites : favorites?.slice(0, 2);

  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <div className={styles.userBox}>
          <div className={styles.user}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                alt="user"
                src="/assets/eu.jpg"
                width={50}
                height={50}
              />

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
                <FormButton text="Salvar" />
              </form>

              <FormButton
                model="1"
                text="Excluir perfil"
                onClick={handleDelete}
              />

              <ErrorMessage error={state.error} />
            </div>
          )}
        </div>
      </div>

      <div>
        <ProjectBox />
      </div>

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
