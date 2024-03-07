import React from "react";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Input } from "../Input/Input";
import styles from "./styles.scss";
import { TCommentInputProps } from "../types";

export const CommentInput: React.FC<TCommentInputProps> = ({
  buttonProps,
  iconProps,
  inputProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <Input {...inputProps} isTextArea className={styles.comment} />
      <div className={styles.controls}>
        <Icon {...iconProps} />
        {buttonProps && <Button {...buttonProps} />}
      </div>
    </div>
  );
};
