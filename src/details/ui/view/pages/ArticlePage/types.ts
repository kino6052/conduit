import { TWithOnMountHandler } from "../../../../../utils/types";
import { TArticleBannerProps } from "../../components/Banner/ArticleBanner/types";
import { TButtonProps } from "../../components/Button/types";
import { TCommentInputProps } from "../../components/Input/types";
import { TTagContentProps } from "../../components/Tag/types";
import { TUserInfoProps } from "../../components/UserInfo/types";

export type TArticlePageProps = {
  bannerProps: TArticleBannerProps;
  userInfoProps?: TUserInfoProps;
  followButtonProps: TButtonProps;
  favoriteButtonProps: TButtonProps;
  commentBoxProps: TCommentInputProps;
  content: string;
  tags: TTagContentProps[];
  comments: TCommentInputProps[];
};
