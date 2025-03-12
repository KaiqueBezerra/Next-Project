"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import userPost from "@/actions/users/user-post";
import styles from "./index.module.css";
import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Criando...</Button>
      ) : (
        <Button>Criar</Button>
      )}
    </>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState(userPost, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    if (state.ok) window.location.href = "/sign-in";
  }, [state.ok]);

  return (
    <form action={action} className={styles.form}>
      <Input label="Nome" name="name" type="text" />
      <Input label="Email" name="email" type="email" />
      <Input label="Senha" name="password" type="password" />
      <ErrorMessage error={state.error} />
      <FormButton />
      <p>
        Ja possui uma conta? <Link href="/sign-in">Login</Link>
      </p>
    </form>
  );
}
