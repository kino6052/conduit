import { ISelectable } from "../../types";
import { ISelector } from "../types";

export class ExclusiveSelector implements ISelector {
  private cb: (selected: ISelectable) => void = () => {};
  private items: ISelectable[] = [];

  constructor(num: number, cb: (selected: ISelectable) => void) {
    this.items = items.map((item, index) => ({
      ...item,
      isSelected: false,
      select: async () => {
        this.select(index);
      },
    }));

    this.cb = cb;
  }
  x;

  constructor(
    items: { name: string; id: string }[],
    cb: (selected: ISelectable) => void,
  ) {
    this.items = items.map((item, index) => ({
      ...item,
      isSelected: false,
      select: async () => {
        this.select(index);
      },
    }));

    this.cb = cb;
  }

  private select(index: number) {
    this.items = this.items.map((item, _index) => ({
      ...item,
      isSelected: index === _index,
    }));

    const item = this.items.find(({ isSelected }) => isSelected);

    if (item) {
      this.cb(item);
    }
  }

  getSelectedItem() {
    return this.items.find((item) => item.isSelected);
  }
}
