import styles from "./ChangeLanguage.module.scss";

import { DropdownMenu } from "radix-ui";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const ChangeLanguage = () => {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.container}>
        {t("change-language")}
        <ChevronDownIcon color="white" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content}>
          <DropdownMenu.Item
            className={styles.item}
            onClick={() => i18next.changeLanguage("en")}
          >
            English
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.item}
            onClick={() => i18next.changeLanguage("ru")}
          >
            Русский
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ChangeLanguage;
