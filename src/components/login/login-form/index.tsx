"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import login from "@/actions/login";
import ErrorMessage from "@/components/helper/error-message";

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

export default function LoginForm() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    if (state.ok) window.location.href = "/";
  }, [state.ok]);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column" }}>
      <Input label="Email" name="email" type="email" />
      <Input label="Senha" name="password" type="password" />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  );
}
