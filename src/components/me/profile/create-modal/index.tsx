"use client";

import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import styles from "./index.module.css";
import projectPost from "@/actions/projects/project-post";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} style={{ width: "100%" }}>
          Criando...
        </Button>
      ) : (
        <Button style={{ width: "100%" }}>Criar</Button>
      )}
    </>
  );
}

export function CreateModal({ onCloseOpen }: { onCloseOpen: () => void }) {
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

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCloseOpen();
    }
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
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <form onSubmit={onSubmit}>
          <Input
            label="Nome"
            name="name"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
          <TextArea
            label="Descrição"
            name="description"
            value={description}
            onChange={({ target }) => {
              setDescription(target.value);
            }}
          />
          <Input
            label="Número para contato"
            name="phoneNumber"
            value={phoneNumber}
            onChange={({ target }) => {
              setPhoneNumber(target.value);
            }}
          />

          <label htmlFor="requirements" className={styles.label}>
            Requisitos
          </label>

          <div className={styles.inputContainer}>
            <input
              type="text"
              id="requirements"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Plus className={styles.plus} onClick={handleAddRequirement} />
          </div>

          <div className={styles.requirements}>
            {requirements.length === 0 ? (
              <p>Nenhum requisito adicionado</p>
            ) : (
              requirements.map((requirement, index) => (
                <div key={index} className={styles.requirement}>
                  <p>{requirement}</p>
                  <X
                    className={styles.icon}
                    onClick={() => handleRemoveRequirement(index)}
                  />
                </div>
              ))
            )}
          </div>

          <ErrorMessage error={error} />

          <FormButton />
        </form>
      </div>
    </div>
  );
}
