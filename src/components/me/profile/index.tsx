"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import { Edit } from "lucide-react";
import userUpdate from "@/actions/user-update";
import styles from "./index.module.css";

import Image from "next/image";
import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} style={{ width: "100%" }}>
          Salvando...
        </Button>
      ) : (
        <Button style={{ width: "100%" }}>Salvar</Button>
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

  const [modal, setModal] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (state.ok) window.location.reload();
  }, [state.ok]);

  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Image
              className={styles.img}
              alt="user"
              src="/assets/eu.jpg"
              width={50}
              height={50}
            />

            <h3>{user?.name}</h3>
          </div>

          <div className={styles.icon}>
            <Edit onClick={() => setModal(!modal)} />
          </div>

          {modal && (
            <div className={styles.modal}>
              <form action={action} style={{ padding: "10px" }}>
                <Input
                  name="name"
                  type="text"
                  placeholder="Novo nome"
                  defaultValue={user?.name}
                />
                <FormButton />
                <ErrorMessage error={state.error} />
              </form>
            </div>
          )}
        </div>

        {/* <div className={styles.bottom}></div> */}
      </div>

      <div className={styles.profileBox}>
        <h3>Favoritos</h3>

        <div className={styles.favorites}>
          <div className={styles.favorite}>
            <h3>Projeto 1</h3>

            <div className={styles.link}>
              <Link href="">Ver mais</Link>
            </div>
          </div>

          <div className={styles.favorite}>
            <h3>Projeto 2</h3>

            <div className={styles.link}>
              <Link href="">Ver mais</Link>
            </div>
          </div>

          <div className={styles.favorite}>
            <h3>Projeto 3</h3>

            <div className={styles.link}>
              <Link href="">Ver mais</Link>
            </div>
          </div>

          <div className={styles.favorite}>
            <h3>Projeto 4</h3>

            <div className={styles.link}>
              <Link href="">Ver mais</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
