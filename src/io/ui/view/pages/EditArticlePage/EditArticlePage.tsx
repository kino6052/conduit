import React from "react";
import { Button } from "../../components/Button";
import { EButtonVariant } from "../../components/Button/types";
import { Input } from "../../components/Input/Input";
import { Tags } from "../../components/Tag";
import styles from "./styles.scss";
import { TEditArticlePageProps } from "./types";

export const EditArticlePage: React.FC<TEditArticlePageProps> = ({
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
