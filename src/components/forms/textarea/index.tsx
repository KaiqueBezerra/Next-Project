import { ComponentProps } from "react";
import styles from "./index.module.css";

type TextAreaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <textarea
        name="description"
        id={props.name}
        className={styles.textArea}
        {...props}
      />
    </div>
  );
}
