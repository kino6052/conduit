import { TSelectable } from "../types";

export interface ISelector<T extends Record<string, unknown>> {
  items: TSelectable<T>[];
  getSelectedItem(): TSelectable<T> | undefined;
  getSelectedIndex(): number;
  unselectAll(): void;
}
