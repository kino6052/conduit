import { TWithId } from "../../utils/types";
import { TCommentInputProps } from "../Input/types";
import { TTagProps } from "../Tag/types";
import { TUserInfoProps } from "../UserInfo/types";

export type TArticleProps = TWithId<{
  title: string;
  description: string;
  tags: TTagProps[];
  likes: number;
  hasLiked: boolean;
  userInfoProps?: TUserInfoProps;
  comments: TCommentInputProps[];
}>;
