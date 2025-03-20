import React, { ComponentProps } from "react";
import styles from "./index.module.css";

type ButtonProps = ComponentProps<"button"> & {
  model?: string;
};

export function Button({ model, ...props }: ButtonProps) {
  return (
    <button
      className={model === "1" ? styles.button1 : styles.button}
      {...props}
    />
  );
}
