import { TWithId } from "../../utils/types";
import { TButtonProps } from "../Button/types";
import { TCommentInputProps } from "../Input/types";
import { TLinkProps } from "../Link/types";
import { TTagProps } from "../Tag/types";
import { TUserInfoProps } from "../UserInfo/types";

export type TArticleProps = TWithId<{
  title: string;
  description: string;
  tags: TTagProps[];
  likeButtonProps: TButtonProps;
  hasLiked: boolean;
  userInfoProps: TUserInfoProps;
  comments: TCommentInputProps[];
  linkProps: TLinkProps;
}>;
