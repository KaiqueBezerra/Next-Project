import { Dispatch, SetStateAction, useState } from "react";
import { ErrorMessage } from "@/components/helper/error-message";
import { TextArea } from "@/components/forms/textarea";
import { Project } from "@/actions/projects/project-by-user-get";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";
import { User } from "@/actions/users/user-get";
import styles from "./index.module.css";
import projectPut from "@/actions/projects/project-put";

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
    }
  }

  return (
    <div className={styles.modal}>
      <div style={{ textAlign: "right" }}>
        <X style={{ cursor: "pointer" }} onClick={() => setModal(false)} />
      </div>
      {user?.id !== project.userId ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "90%",
          }}
        >
          <TextArea label="Descreva o problema" name="report" />
          <Button style={{ width: "100%" }}>Denunciar</Button>
        </div>
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

          <Button style={{ width: "100%" }}>Atualizar</Button>
        </form>
      )}
    </div>
  );
}
