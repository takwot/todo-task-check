import { useTodos } from "../../../../entities/task/model/api";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.scss";

import { Accordion } from "radix-ui";

const TodoList = () => {
  const { data } = useTodos();

  return (
    <Accordion.Root type="single" className={styles.container} collapsible>
      {data?.map((el) => (
        <Todo {...el} key={el.id} />
      ))}
    </Accordion.Root>
  );
};

export default TodoList;
