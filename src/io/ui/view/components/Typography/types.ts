import { TWithClassName } from "../../../../../utils/types";

export enum ETypographyType {
  Regular = "regular",
  RegularBold = "regular-bold",
  RegularGrey = "regular-grey",
  Heading1 = "h1",
  Heading2 = "h2",
}

export type TTypographyProps = TWithClassName<{
  value: string;
  variant?: ETypographyType;
}>;
