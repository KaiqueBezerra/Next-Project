import { LoginForm } from "@/components/login/login-form";
import styles from "./page.module.css";

export default function SignIn() {
  return (
    <section className={styles.section}>
      <h1>Login</h1>
      <LoginForm />
    </section>
  );
}
