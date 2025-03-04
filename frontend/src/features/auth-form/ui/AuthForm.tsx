import { useState } from "react";
import styles from "./AuthForm.module.scss";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthForm } from "../model/form.type";
import { useLogin, useRegister } from "../../../entities/user";
import ChangeLanguage from "../../../shared/ui/ChangeLanguage/ChangeLanguage";

export const AuthForm = () => {
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);

  const registration = useRegister();

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
  } = useForm<IAuthForm>();

  const loginMutation = useLogin();

  const loginHandle: SubmitHandler<IAuthForm> = (data) => {
    (isLogin ? loginMutation : registration).mutate({
      email: data.email,
      password: data.password,
    });
    reset();
  };

  return (
    <div className={styles.container}>
      <p className={styles.authText}>{t(isLogin ? "login" : "register")}</p>
      <form onSubmit={handleSubmit(loginHandle)}>
        <div>
          <label className={styles.text}>{t("email")}</label>
          <input
            {...register("email")}
            type="email"
            style={{
              borderColor: errors.email && "red",
            }}
            autoComplete="off"
          />
        </div>
        <div>
          <label className={styles.text}>{t("password")}</label>
          <input
            autoComplete="off"
            {...register("password", { min: 6 })}
            style={{
              borderColor: errors.password && "red",
            }}
            type="password"
          />
        </div>
        <button disabled={!isValid}>
          {t((isLogin && "login") || "register")}
        </button>
      </form>
      <p
        className={styles.text}
        style={{ cursor: "pointer" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {t("no-acc")}
      </p>
      <ChangeLanguage />
    </div>
  );
};
