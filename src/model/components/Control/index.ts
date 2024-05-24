import { IControl } from "./types";

export class Control implements IControl {
  public isDisabled = false;

  constructor(
    public text: string,
    public onActivate?: () => Promise<void>,
  ) {}
}
