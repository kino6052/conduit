import React from "react";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Input } from "../Input";
import { TCommentInputProps } from "../types";
import styles from "./styles.scss";

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
