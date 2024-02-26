import React from "react";
import { Button } from "../../components/Button";
import { TButtonProps } from "../../components/Button/types";
import { Input } from "../../components/Input";
import { TInputProps } from "../../components/Input/Input";
import "./styles.scss";

export type TNewPostPageProps = {
  titleInputProps: TInputProps;
  articleInputProps: TInputProps;
  tagsInputProps: TInputProps;
  buttonProps: TButtonProps;
};

export const NewPostPage: React.FC<TNewPostPageProps> = ({
  titleInputProps,
  articleInputProps,
  tagsInputProps,
  buttonProps,
}) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <Input {...titleInputProps} />
        <Input {...articleInputProps} />
        <Input {...tagsInputProps} />
        <Button {...buttonProps} />
      </div>
    </div>
  );
};
