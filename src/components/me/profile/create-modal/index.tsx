"use client";

import { Info, Plus, X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { useState } from "react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import {
  projectDescriptionRegex,
  projectNameRegex,
  projectPhoneNumberRegex,
} from "@/functions/regex/project-regex/project-regex";

import projectPost from "@/actions/projects/project-post";
import styles from "./index.module.css";

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

export function CreateModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [info, setInfo] = useState(false);
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
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <form onSubmit={onSubmit}>
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

          <div>
            <label htmlFor="phoneNumber" className={styles.label}>
              Número para contato
            </label>

            <div className={styles.inputContainer}>
              <input
                type="text"
                id="phoneNumber"
                className={styles.input}
                value={phoneNumber}
                onChange={(e) =>
                  projectPhoneNumberRegex(e.target.value, setPhoneNumber)
                }
              />
              <Info className={styles.plus} onClick={() => setInfo(!info)} />
              {info && (
                <div className={styles.info}>
                  <p>O número deve conter 11 dígitos.</p>
                  <p>Ex: 11234567890</p>
                </div>
              )}
            </div>
          </div>

          <div>
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
