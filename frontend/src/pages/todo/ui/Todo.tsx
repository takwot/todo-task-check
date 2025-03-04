import { useEffect } from "react";
import { useLogout, useMe, useUserStore } from "../../../entities/user";
import AddTodo from "../../../features/add-todo/ui/AddTodo";
import TodoList from "../../../features/todo-list/ui/TodoList/TodoList";

import Avatar from "../../../shared/assets/default-avatar.svg?react";
import Logout from "../../../shared/assets/logout.svg?react";

import styles from "./Todo.module.scss";
import ChangeLanguage from "../../../shared/ui/ChangeLanguage/ChangeLanguage";
import { useNavigate } from "react-router-dom";

export const Todo = () => {
  const { user, clearStore } = useUserStore();

  const profile = useMe();

  const logout = useLogout();

  const router = useNavigate();

  useEffect(() => {
    if (!user) {
      try {
        profile.mutateAsync();
      } catch (e) {
        router("/sign-in");
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <ChangeLanguage />
        <div className={styles.user}>
          <Avatar /> {user?.email}{" "}
          <Logout
            className={styles.logout}
            onClick={() => {
              logout.mutate();
              clearStore();
            }}
          />
        </div>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};
