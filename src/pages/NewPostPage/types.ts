import { TButtonContentProps } from "../../components/Button/types";
import { TInputContentProps } from "../../components/Input/types";
import { TTagContentProps } from "../../components/Tag/types";

export type TNewPostPageProps = {
  titleInputProps: TInputContentProps;
  articleInputProps: TInputContentProps;
  tagsInputProps: TInputContentProps;
  tags: TTagContentProps[];
  buttonProps: TButtonContentProps;
};

export enum ENewPostPageId {
  PostId = "PostId",
}
