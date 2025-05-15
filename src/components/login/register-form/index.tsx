"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

import userPost from "@/actions/users/user-post";

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
    <div className="flex flex-col gap-10 text-white">
      <h1 className="text-2xl text-center font-serif sm:text-4xl">Registro</h1>
      <form
        action={action}
        className="flex flex-col gap-4 w-[300px] 
        min-[410px]:w-[390px] min-[510px]:w-[490px]"
      >
        <Input label="Nome" name="name" type="text" />
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
        <p className="p-2.5">
          Ja possui uma conta?{" "}
          <Link
            href="/sign-in"
            className="underline font-bold  text-amber-500 hover:text-amber-800"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
