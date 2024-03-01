import { TWithClassName, TWithId } from "../../utils/types";

export type TLinkProps = TWithId<
  TWithClassName<{
    href?: string;
  }>
>;
