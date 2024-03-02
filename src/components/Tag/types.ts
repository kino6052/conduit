import { TWithClassName, TWithId } from "../../utils/types";

export type TTagContentProps = TWithId<{ text: string }>;

export type TTagProps = TWithClassName<TTagContentProps>;
