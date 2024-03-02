import { TArticleBannerProps } from "../../components/Banner/types";
import { TButtonContentProps } from "../../components/Button/types";
import { TCommentInputProps } from "../../components/Input/types";
import { TTagContentProps } from "../../components/Tag/types";
import { TUserInfoContentProps } from "../../components/UserInfo/types";

export type TArticlePageProps = {
  bannerProps: TArticleBannerProps;
  userInfoProps: TUserInfoContentProps;
  followButtonProps: TButtonContentProps;
  favoriteButtonProps: TButtonContentProps;
  commentBoxProps: TCommentInputProps;
  content: string;
  tags: TTagContentProps[];
};
