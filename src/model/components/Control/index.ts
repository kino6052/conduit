export class Control {
  public isDisabled = false;

  constructor(
    public text: string,
    public onActivate?: () => Promise<void>,
  ) {}
}
