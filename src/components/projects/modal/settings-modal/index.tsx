import { Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";

import { Requirements } from "@/components/forms/demand-form/requirements-input";
import { ErrorMessage } from "@/components/helper/error-message";
import { PhoneInput } from "@/components/forms/demand-form/phone-input";
import { TextArea } from "@/components/forms/textarea";
import { Project } from "@/actions/projects/project-by-user-get";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

import { X } from "lucide-react";

import { projectRegex } from "@/functions/regex/project-regex/project-regex";

import { User } from "@/actions/users/user-get";
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
            rows={8}
          />

          <PhoneInput
            value={phoneNumber}
            onChange={({ target }) => {
              projectRegex.projectPhoneNumberRegex(
                target.value,
                setPhoneNumber
              );
            }}
          />
          <Requirements
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddRequirement={handleAddRequirement}
            handleRemoveRequirement={handleRemoveRequirement}
            requirements={requirements}
          />

          <ErrorMessage error={error} />
          <div className="flex justify-end gap-2">
            <div className="w-[30%]">
              <FormButton />
            </div>
            <div className="w-[30%]">
              <Button
                disabled={loading}
                onClick={handleDelete}
                type="button"
                className="flex justify-center items-center cursor-pointer p-3.5 font-bold text-black
                transition duration-200 border border-zinc-700 bg-red-500 hover:opacity-80
                disabled:opacity-60 disabled:cursor-wait w-full"
              >
                {loading ? "Excluindo" : "Excluir"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
