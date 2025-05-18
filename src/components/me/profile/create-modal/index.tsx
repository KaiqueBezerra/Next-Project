"use client";

import { useFormStatus } from "react-dom";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Requirements } from "@/components/forms/demand-form/requirements-input";
import { ErrorMessage } from "@/components/helper/error-message";
import { PhoneInput } from "@/components/forms/demand-form/phone-input";
import { TextArea } from "@/components/forms/textarea";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

import { X } from "lucide-react";

import { projectRegex } from "@/functions/regex/project-regex/project-regex";
import projectPost from "@/actions/projects/project-post";

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

  const [requirements, setRequirements] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

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
    <div className="flex items-center justify-center p-2 min-h-screen">
      <div
        className="flex flex-col bg-zinc-700 rounded-md p-6 sm:p-8 border-10 border-double border-zinc-800 
      text-white text-justify w-[1200px] shadow-[0px_0px_10px_0px_black] gap-2"
      >
        <div className="flex justify-end">
          <X
            className="cursor-pointer hover:text-amber-500"
            onClick={() => router.back()}
          />
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          <Input
            label="Nome"
            name="name"
            value={name}
            onChange={({ target }) => {
              projectRegex.projectNameRegex(target.value, setName);
            }}
          />
          <TextArea
            label="Descrição"
            name="description"
            value={description}
            onChange={({ target }) => {
              projectRegex.projectDescriptionRegex(
                target.value,
                setDescription
              );
            }}
          />

          <PhoneInput
            label="Telefone"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) =>
              projectRegex.projectPhoneNumberRegex(
                e.target.value,
                setPhoneNumber
              )
            }
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
