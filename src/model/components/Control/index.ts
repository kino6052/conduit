import { IControl } from "./types";

export class Control implements IControl {
  public isDisabled = false;
  public onActivate: () => Promise<void>;

  constructor(
    public text: string,
    onActivate?: () => Promise<void>,
  ) {
    this.onActivate = async () => {
      this.isDisabled = true;
      await onActivate?.();
      this.isDisabled = false;
    };
  }
}
