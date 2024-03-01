import { TWithId } from "../../utils/types";
import { TTagProps } from "../Tag/types";
import { TUserInfoProps } from "../UserInfo/types";

export type TPostProps = TWithId<{
  title: string;
  description: string;
  tags: TTagProps[];
  likes: number;
  userInfoProps: TUserInfoProps;
}>;
