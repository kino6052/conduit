import { TButtonContentProps } from "../../components/Button/types";
import { TInputContentProps } from "../../components/Input/types";
import { TTagContentProps } from "../../components/Tag/types";

export type TEditArticlePageProps = {
  titleInputProps: TInputContentProps;
  articleInputProps: TInputContentProps;
  tagsInputProps: TInputContentProps;
  tags: TTagContentProps[];
  buttonProps: TButtonContentProps;
};
