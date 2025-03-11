import { ComponentProps } from "react";
import styles from "./index.module.css";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <input className={styles.input} type="text" id={props.name} {...props} />
    </div>
  );
}
