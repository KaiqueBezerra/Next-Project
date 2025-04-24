"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

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
    <div className="flex flex-col gap-10 text-white">
      <h1 className="text-4xl text-center font-serif">Login</h1>
      <form
        action={action}
        className="flex flex-col gap-4 w-[310px] 
        min-[410px]:w-[400px] min-[510px]:w-[500px]"
      >
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
        <p className="p-2.5">
          Ainda não possui uma conta?{" "}
          <Link
            href="/sign-in/register"
            className="underline font-bold text-amber-500 hover:text-amber-800"
          >
            Registrar
          </Link>
        </p>
      </form>
    </div>
  );
}
