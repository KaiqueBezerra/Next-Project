import { Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { Project } from "@/actions/projects/project-by-user-get";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import { User } from "@/actions/users/user-get";
import styles from "./index.module.css";
import projectPut from "@/actions/projects/project-put";
import reportPost from "@/actions/reports/report-post";
import projectDelete from "@/actions/projects/project-delete";

function FormButton({ width }: { width?: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled style={{ width: width }}>
          Enviando...
        </Button>
      ) : (
        <Button style={{ width: width }}>Enviar</Button>
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
    <div className={styles.modal}>
      <div style={{ textAlign: "right" }}>
        <X className={styles.x} onClick={() => setModal(false)} />
      </div>
      {user?.id !== project.userId ? (
        <form onSubmit={handleReport} className={styles.report}>
          <TextArea label="Descreva o problema" name="report" />
          <ErrorMessage error={error} />
          <FormButton width="100%" />
        </form>
      ) : (
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

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormButton width="40%" />
            <Button disabled={loading} onClick={handleDelete} model="1">
              {loading ? "Excluindo" : "Excluir"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
