import { TWithId } from "../../utils/types";

export enum ETabVariant {
  Menu = "menu",
  Default = "default",
}

export type TTabProps = TWithId<{
  isActive?: boolean;
  text: string;
  variant: ETabVariant;
  icon?: string;
}>;
