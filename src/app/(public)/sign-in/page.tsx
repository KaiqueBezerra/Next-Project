"use client";

import { LoginForm } from "@/components/login/login-form";
import { useEffect } from "react";

export default function SignIn() {
  useEffect(() => {
    // Adiciona a classe 'no-scroll' ao body quando a página for carregada
    document.body.classList.add("no-scroll");

    window.scrollTo(0, 0);

    // Remove a classe 'no-scroll' quando a página for destruída
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <section>
      <LoginForm />
    </section>
  );
}
