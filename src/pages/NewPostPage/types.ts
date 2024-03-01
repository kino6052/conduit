import { TButtonContentProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";
import { TTagProps } from "../../components/Tag/types";

export type TNewPostPageProps = {
  titleInputProps: TInputProps;
  articleInputProps: TInputProps;
  tagsInputProps: TInputProps;
  tags: TTagProps[];
  buttonProps: TButtonContentProps;
};

export enum ENewPostPageId {
  PostId = "PostId",
}
