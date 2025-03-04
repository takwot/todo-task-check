import { AuthForm } from "../../../features/auth-form";
import styles from "./SignIn.module.scss";

export const SignInPage = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
};
