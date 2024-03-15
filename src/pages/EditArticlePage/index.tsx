import React from "react";
import { Button } from "../../components/Button";
import { EButtonVariant } from "../../components/Button/types";
import { Input } from "../../components/Input/Input";
import { Tags } from "../../components/Tag/Tag";
import { ENewPostPageConstant } from "./constants";
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
        <Input {...titleInputProps} id={ENewPostPageConstant.TitleInputId} />
        <Input
          {...articleInputProps}
          isTextArea
          id={ENewPostPageConstant.TextInputId}
        />
        <Input {...tagsInputProps} id={ENewPostPageConstant.TagsInputId} />
        <Tags tags={tags} />
      </div>
      <Button
        variant={EButtonVariant.Primary}
        {...buttonProps}
        id={ENewPostPageConstant.SubmitButtonId}
      />
    </div>
  );
};
