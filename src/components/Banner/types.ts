import { TUserInfoProps } from "../UserInfo/types";

export enum EBannerVariant {
  UserInfo = "user-info",
  Article = "article",
  Default = "default",
}

export type TBannerProps = {
  variant: EBannerVariant;
  heading?: string;
  userInfo?: TUserInfoProps;
};

export type TArticleBannerProps = {
  title: string,
  userInfoProps: TUserInfoProps
}