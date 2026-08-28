import { TSelectable } from "../../types";
import { ISelector } from "../types";

export class ExclusiveSelector<T extends Record<string, unknown>>
  implements ISelector<T>
{
  private cb: (selected: TSelectable<T>, index: number) => Promise<void> =
    async () => {};
  public items: TSelectable<T>[] = [];

  constructor(
    items: T[],
    cb: (selected: TSelectable<T>, index: number) => Promise<void>,
    preselectedIndex?: number,
  ) {
    this.items = items.map((item, index) => ({
      isSelected:
        typeof preselectedIndex === "number" && index === preselectedIndex,
      ...item,
      select: async () => {
        await this.select(index);
      },
    }));

    this.cb = cb;
  }

  private async select(index: number) {
    this.items = this.items.map((item, _index) => ({
      ...item,
      isSelected: index === _index,
    }));

    const item = this.items.find(({ isSelected }) => isSelected);

    if (item) {
      await this.cb(item, index);
    }
  }

  getSelectedItem() {
    return this.items.find((item) => item.isSelected);
  }

  getSelectedIndex() {
    return this.items.findIndex((item) => item.isSelected);
  }

  unselectAll(): void {
    this.items = this.items.map((item) => ({
      ...item,
      isSelected: false,
    }));
  }
}
