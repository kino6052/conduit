import { ISelectable } from "../types";

export interface ITab extends ISelectable {
  name: string;
  id: string;
  isSelected: boolean;
  select: () => Promise<void>;
}
