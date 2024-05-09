import { ITab } from "../Tab/types";

export class ContentTab implements ITab {
  constructor(
    public name: string,
    public id: string,
    public open: () => Promise<void>,
    isSelected?: boolean,
  ) {
    this.isSelected = !!isSelected;
  }

  public isSelected: boolean = false;
}
