import { ITab } from "../Tab/types";

export class ContentTab implements ITab {
  constructor(
    public name: string,
    public id: string,
    public open: () => Promise<void>,
  ) {}

  public isSelected: boolean = false;
}
