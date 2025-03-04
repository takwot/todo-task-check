import { SubmitHandler, useForm } from "react-hook-form";
import { useAddTodo } from "../../../entities/task/model/api";
import styles from "./AddTodo.module.scss";

import clsx from "clsx";
import { ITodoForm } from "../model/add-todo.type";
import { useTranslation } from "react-i18next";

const AddTodo = () => {
  const addTodo = useAddTodo();

  const { t } = useTranslation();

  const { register, handleSubmit, reset } = useForm<ITodoForm>();

  const addTodoHandle: SubmitHandler<ITodoForm> = (data) => {
    addTodo.mutate({ title: data.title, description: data.description });
    reset();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(addTodoHandle)}>
      <input
        className={styles.input}
        placeholder={t("add-todo-name")}
        {...register("title")}
      />
      <textarea
        className={clsx(styles.input, styles.textarea)}
        placeholder={t("add-todo-decs")}
        {...register("description")}
      />
      <button className={styles.button}>{t("add")}</button>
    </form>
  );
};

export default AddTodo;
