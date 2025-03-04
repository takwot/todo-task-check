import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { Accordion } from "radix-ui";
import classNames, { clsx } from "clsx";
import { CheckIcon, ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";
import styles from "./Todo.module.scss";
import { ITask } from "../../model/task.type";
import { Checkbox } from "radix-ui";
import {
  useChangeStatus,
  useDeleteTodo,
  useUpdateTodo,
} from "../../../../entities/task/model/api";
import { useTranslation } from "react-i18next";

const Todo = ({ id, title, description, status }: ITask) => {
  const [value, setValue] = useState(description);

  const [checked, setChecked] = useState(status);

  const { t } = useTranslation();

  const deleteTodo = useDeleteTodo();
  const changeStatus = useChangeStatus();
  const updateTodo = useUpdateTodo();

  return (
    <Accordion.Item className={styles.item} value={id}>
      <div className={styles.container}>
        <Checkbox.Root
          className={styles.checkBoxroot}
          checked={checked}
          onClick={() => {
            changeStatus.mutate({ id, status: !checked });
            setChecked(!checked);
          }}
          id="c1"
        >
          <Checkbox.Indicator className={styles.indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <AccordionTrigger className={clsx(checked && styles.checked)}>
          {title}
        </AccordionTrigger>
        <TrashIcon
          className={styles.trash}
          width={15}
          height={15}
          onClick={() => deleteTodo.mutate(id)}
        />
      </div>
      <AccordionContent style={{ transition: "none !important" }}>
        <div className={styles.contentText}>
          <textarea value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            disabled={value === description}
            onClick={() =>
              updateTodo.mutate({
                id,
                status: checked,
                title,
                description: value,
              })
            }
          >
            {t("add")}
          </button>
        </div>
      </AccordionContent>
    </Accordion.Item>
  );
};

const AccordionTrigger = forwardRef<
  ElementRef<typeof Accordion.Trigger>,
  ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.header}>
    <Accordion.Trigger
      className={classNames(styles.trigger, className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className={styles.chevron} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = forwardRef<
  ElementRef<typeof Accordion.Content>,
  ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ className, children, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(styles.content, className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export default Todo;
