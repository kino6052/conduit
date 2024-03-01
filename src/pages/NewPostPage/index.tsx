import React from "react";
import { Button } from "../../components/Button";
import { EButtonVariant } from "../../components/Button/types";
import { Input } from "../../components/Input";
import { Tags } from "../../components/Tag/Tag";
import styles from "./styles.scss";
import { TNewPostPageProps } from "./types";

export const NewPostPage: React.FC<TNewPostPageProps> = ({
  titleInputProps,
  articleInputProps,
  tagsInputProps,
  tags,
  buttonProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["form-wrapper"]}>
        <Input {...titleInputProps} />
        <Input {...articleInputProps} isTextArea />
        <Input {...tagsInputProps} />
        <Tags tags={tags} />
      </div>
      <Button variant={EButtonVariant.Primary} {...buttonProps} />
    </div>
  );
};
