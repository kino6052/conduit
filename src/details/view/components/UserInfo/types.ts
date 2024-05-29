import { TWithClassName, TWithClickHandler } from "../../../../utils/types";

export type TUserInfoContentProps = {
  date: string;
  username: string;
  imageSrc?: string;
};

export type TUserInfoProps = TWithClickHandler<
  TWithClassName<TUserInfoContentProps>
>;
