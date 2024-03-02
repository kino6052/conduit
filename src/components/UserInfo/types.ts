import { TWithClassName } from "../../utils/types";

export type TUserInfoContentProps = {
  date: string;
  username: string;
};

export type TUserInfoProps = TWithClassName<TUserInfoContentProps>;
