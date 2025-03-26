"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

import styles from "./index.module.css";
import login from "@/actions/users/login";

import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Entrando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  );
}

export function LoginForm() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    if (state.ok) window.location.href = "/me";
  }, [state.ok]);

  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <form action={action} className={styles.form}>
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
        <p>
          Ainda não possui uma conta?{" "}
          <Link href="/sign-in/register">Registrar</Link>
        </p>
      </form>
    </div>
  );
}
