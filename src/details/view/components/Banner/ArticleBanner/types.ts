import { TButtonProps } from "../../Button/types";
import { TUserInfoProps } from "../../UserInfo/types";

export type TArticleBannerProps = {
  title: string;
  userInfoProps?: TUserInfoProps;
  canEdit?: boolean;
  editButtonProps?: TButtonProps;
  deleteButtonProps?: TButtonProps;
};
