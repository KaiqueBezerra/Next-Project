"use client";

import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { useState } from "react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import {
  projectDescriptionRegex,
  projectNameRegex,
} from "@/functions/regex/project-regex/project-regex";

import projectPost from "@/actions/projects/project-post";

import { PhoneInput } from "@/components/forms/demand-form/phone-input";
import { Requirements } from "@/components/forms/demand-form/requirements-input";

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

export function CreateModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState("");

  const [requirements, setRequirements] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");

  function handleAddRequirement() {
    if (inputValue.trim() !== "") {
      setRequirements((prevRequirements) => [...prevRequirements, inputValue]);
      setInputValue("");
    }
  }

  function handleRemoveRequirement(index: number) {
    setRequirements((prevRequirements) =>
      prevRequirements.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ok, error } = await projectPost({
      name,
      description,
      requirements,
      phoneNumber,
    });

    if (ok) {
      window.location.href = "/me";
    } else {
      setError(error);

      const timeoutId = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }

  return (
    <div className="flex justify-center xl:items-center xl:shadow-[0px_0px_50px_0px_black] p-5">
      <div
        className="flex flex-col w-full rounded-md p-5 border-5 border-double border-zinc-900
        bg-zinc-700 max-w-[610px] shadow-[0px_0px_50px_0px_black] text-white max-xl:h-[650px]"
      >
        <form onSubmit={onSubmit} className="grid gap-3">
          <Input
            label="Nome"
            name="name"
            value={name}
            onChange={({ target }) => {
              projectNameRegex(target.value, setName);
            }}
          />
          <TextArea
            label="Descrição"
            name="description"
            value={description}
            onChange={({ target }) => {
              projectDescriptionRegex(target.value, setDescription);
            }}
          />

          <PhoneInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />

          <Requirements
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddRequirement={handleAddRequirement}
            handleRemoveRequirement={handleRemoveRequirement}
            requirements={requirements}
          />

          <ErrorMessage error={error} />

          <FormButton />
        </form>
      </div>
    </div>
  );
}
