import React from "react";
import { Button } from "../../components/Button";
import { EButtonVariant } from "../../components/Button/types";
import { Input } from "../../components/Input/Input";
import styles from "./styles.scss";
import { TSettingsPageProps } from "./types";

export const SettingsPage: React.FC<TSettingsPageProps> = ({
  inputProps,
  buttonProps,
  logoutButtonProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["form-wrapper"]}>
        <Input {...inputProps} />
      </div>
      <Button variant={EButtonVariant.Primary} {...buttonProps} />
      <Button variant={EButtonVariant.Secondary} {...logoutButtonProps} />
    </div>
  );
};
