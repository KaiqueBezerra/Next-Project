import React, { ComponentProps } from "react";
import styles from "./index.module.css";

type ButtonProps = ComponentProps<"button">;

export function Button(props: ButtonProps) {
  return <button className={styles.button} {...props} />;
}
