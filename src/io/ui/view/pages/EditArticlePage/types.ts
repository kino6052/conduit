import { TWithOnMountHandler } from "../../../../../utils/types";
import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";
import { TTagProps } from "../../components/Tag/types";

export type TEditArticlePageProps = TWithOnMountHandler<{
  titleInputProps: TInputProps;
  articleInputProps: TInputProps;
  tagsInputProps: TInputProps;
  tags: TTagProps[];
  buttonProps: TButtonProps;
}>;
