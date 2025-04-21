import { Dispatch, SetStateAction, useState } from "react";
import { Info, Plus, X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { Project } from "@/actions/projects/project-by-user-get";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import { User } from "@/actions/users/user-get";
import {
  projectDescriptionRegex,
  projectNameRegex,
  projectPhoneNumberRegex,
} from "@/functions/regex/project-regex/project-regex";

import projectDelete from "@/actions/projects/project-delete";
import reportPost from "@/actions/reports/report-post";
import projectPut from "@/actions/projects/project-put";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export function SettingsModal({
  setModal,
  user,
  project,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  project: Project;
}) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [phoneNumber, setPhoneNumber] = useState(project.phoneNumber);

  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState(false);
  const [error, setError] = useState("");

  const [requirements, setRequirements] = useState<string[]>(
    project.requirements
  );

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

    const { ok, error } = await projectPut({
      id: project.id,
      name,
      description,
      requirements,
      phoneNumber,
    });

    if (ok) {
      setModal(false);
      window.location.reload();
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

  async function handleDelete() {
    const deleteConfirm = confirm("Tem certeza que deseja deletar?");

    if (deleteConfirm) {
      setLoading(true);
      const { ok, error } = await projectDelete(project.id);

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

      setLoading(false);
    }
  }

  async function handleReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ok, error } = await reportPost({
      comment: event.currentTarget.report.value,
      projectId: project.id,
    });

    if (ok) {
      alert("Reportado com sucesso!");
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
    <div
      className="flex flex-col bg-zinc-700 rounded-md p-6 sm:p-8 border-10 border-double border-zinc-800 
      text-white text-justify w-[1200px] shadow-[0px_0px_10px_0px_black] gap-2"
    >
      <div className="flex justify-end">
        <X
          className="cursor-pointer hover:text-amber-500"
          onClick={() => setModal(false)}
        />
      </div>
      {user?.id !== project.userId ? (
        <form
          onSubmit={handleReport}
          className="flex flex-col gap-4 min-h-[400px]"
        >
          <TextArea label="Descreva o problema" name="report" rows={4} />
          <ErrorMessage error={error} />
          <FormButton />
        </form>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            rows={8}
          />
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-lg leading-none pb-2"
            >
              Número para contato
            </label>

            <div className="flex relative h-16">
              <input
                type="text"
                id="phoneNumber"
                className="border border-zinc-700 block text-lg p-4 rounded-bl-md rounded-tl-md transition duration-200 w-full 
                bg-zinc-800 focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
                value={phoneNumber}
                onChange={(e) =>
                  projectPhoneNumberRegex(e.target.value, setPhoneNumber)
                }
              />
              <Info
                className="border border-zinc-700 bg-zinc-800 rounded-br-md rounded-tr-md 
                cursor-pointer h-16 w-16 p-3 hover:border-amber-800 hover:shadow-2xl"
                onClick={() => setInfo(!info)}
              />
              {info && (
                <div
                  className="flex flex-col items-center justify-center p-2 right-0 bottom-[-70px]
                  rounded-md absolute z-50 bg-zinc-800 shadow-[0px_0px_10px_0px_black]"
                >
                  <p>O número deve conter 11 dígitos.</p>
                  <p>Ex: 11234567890</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="requirements"
              className="block text-lg leading-none pb-2"
            >
              Requisitos
            </label>

            <div className="flex relative h-16">
              <input
                type="text"
                id="requirements"
                className="border border-zinc-700 block text-lg p-4 rounded-bl-md rounded-tl-md transition duration-200
                w-full bg-zinc-800 focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Plus
                className="border border-zinc-700 bg-zinc-800 rounded-br-md rounded-tr-md 
                cursor-pointer h-16 w-16 p-3 hover:border-amber-800 hover:shadow-2xl"
                onClick={handleAddRequirement}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 bg-zinc-800 p-5 rounded-md">
            {requirements.length === 0 ? (
              <p>Nenhum requisito adicionado</p>
            ) : (
              requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="bg-amber-500 border border-zinc-800
                  font-bold text-black relative pr-6 px-3 py-3"
                >
                  <p>{requirement}</p>
                  <X
                    className="absolute top-[1px] right-[1px]
                    cursor-pointer hover:text-zinc-900 text-white"
                    onClick={() => handleRemoveRequirement(index)}
                  />
                </div>
              ))
            )}
          </div>
          <ErrorMessage error={error} />
          <div className="flex justify-end gap-2">
            <div className="w-[30%]">
              <FormButton />
            </div>
            <div className="w-[30%]">
              <Button disabled={loading} onClick={handleDelete} model="1">
                {loading ? "Excluindo" : "Excluir"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
