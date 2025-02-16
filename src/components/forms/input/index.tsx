import styles from "./index.module.css";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <input className={styles.input} type="text" id={props.name} {...props} />
    </div>
  );
}
