import { ITab } from "./types";

export class ContentTab implements ITab {
  select: () => Promise<void>;

  constructor(
    public name: string,
    public id: string,
    select: (id: string) => Promise<void>,
    isSelected?: boolean,
  ) {
    this.isSelected = !!isSelected;
    this.select = async () => select(id);
  }

  public isSelected: boolean = false;
}
