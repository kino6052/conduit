import {
  TWithClassName,
  TWithClickHandler,
  TWithId,
} from "../../../../../utils/types";

export type TTagContentProps = TWithClickHandler<TWithId<{}>>;

export type TTagProps = TWithClassName<TTagContentProps>;
