export enum ETabVariant {
  Menu = "menu",
  Default = "default",
}

export type TTabProps = {
  isActive?: boolean;
  text: string;
  variant: ETabVariant;
  icon?: string;
  id?: string;
};
